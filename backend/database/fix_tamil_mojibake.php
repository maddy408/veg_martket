<?php

declare(strict_types=1);

/**
 * Repairs Tamil text that was corrupted by a UTF-8 -> CP437 -> UTF-8
 * round trip (the classic "mysql.exe import from a Windows console without
 * --default-character-set=utf8mb4" mojibake). Root cause explained in
 * database/README_TAMIL_CHARSET_FIX.md.
 *
 * SAFE BY CONSTRUCTION: iconv('UTF-8', 'CP437', $value) only succeeds when
 * every character in $value has a CP437 code point. Real Tamil text (U+0B80-
 * U+0BFF) has none, so iconv() returns false and the row is left untouched.
 * Only the corrupted rows - whose "text" is actually Latin-1-supplement /
 * Greek / box-drawing characters, all of which CP437 can represent - survive
 * the round trip and get fixed. Plain ASCII (English names, codes) round-
 * trips to itself, so it is harmless to run this over English columns too.
 *
 * Usage:
 *   php fix_tamil_mojibake.php                 # dry run, prints a diff, writes nothing
 *   php fix_tamil_mojibake.php --apply          # applies the fix inside one transaction
 *   php fix_tamil_mojibake.php --apply --yes    # skips the confirmation prompt (for CI/cron)
 *
 * ALWAYS run without --apply first and read the diff. Take a DB backup
 * before the first --apply run on a database you haven't tested this
 * against yet:
 *   mysqldump --default-character-set=utf8mb4 -u USER -p DBNAME > backup_before_fix.sql
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/database.php';

$apply = in_array('--apply', $argv, true);
$skipConfirm = in_array('--yes', $argv, true);

// [table, id_column, text_column] - every column that can legitimately hold
// shop-entered Tamil text. English-only columns are harmless to include
// (ASCII round-trips to itself - see docblock) but are left out to keep the
// diff output focused on what actually matters.
$targets = [
    ['payment_methods', 'id', 'name_ta'],
    ['items', 'id', 'name_ta'],
    ['parties', 'id', 'name'],
    ['parties', 'id', 'place'],
    ['bills', 'id', 'walkin_name'],
    ['bills', 'id', 'notes'],
    ['bill_lines', 'id', 'item_name_ta'],
    ['purchase_lines', 'id', 'item_name_ta'],
    ['payments', 'id', 'notes'],
    ['held_bills', 'id', 'label'],
    ['settings', 'key', 'value'],
];

function attemptFix(?string $value): ?string
{
    if ($value === null || $value === '') {
        return null;
    }
    $fixed = @iconv('UTF-8', 'CP437', $value);
    if ($fixed === false) {
        return null; // not CP437-representable -> not corrupted this way, leave alone
    }
    if ($fixed === $value) {
        return null; // round-tripped to itself (plain ASCII) -> nothing to change
    }
    if (!mb_check_encoding($fixed, 'UTF-8')) {
        return null; // recovered bytes aren't valid UTF-8 -> not this corruption, don't touch
    }
    return $fixed;
}

$pdo = get_pdo();
$totalChanges = [];

foreach ($targets as [$table, $idCol, $col]) {
    $stmt = $pdo->query("SELECT `{$idCol}` AS id, `{$col}` AS val FROM `{$table}` WHERE `{$col}` IS NOT NULL AND `{$col}` <> ''");
    foreach ($stmt->fetchAll() as $row) {
        $fixed = attemptFix($row['val']);
        if ($fixed === null) {
            continue;
        }
        $totalChanges[] = [
            'table' => $table,
            'id_col' => $idCol,
            'col' => $col,
            'id' => $row['id'],
            'before' => $row['val'],
            'after' => $fixed,
        ];
    }
}

echo count($totalChanges) . " row(s) look corrupted and would be fixed:\n\n";
foreach ($totalChanges as $c) {
    printf("  [%s#%s].%s\n    before: %s\n    after:  %s\n\n", $c['table'], $c['id'], $c['col'], $c['before'], $c['after']);
}

if (count($totalChanges) === 0) {
    echo "Nothing to do.\n";
    exit(0);
}

if (!$apply) {
    echo "Dry run only - no changes written. Re-run with --apply to write these changes.\n";
    exit(0);
}

if (!$skipConfirm) {
    echo "About to UPDATE " . count($totalChanges) . " row(s) as shown above. Type 'yes' to continue: ";
    $confirm = trim((string) fgets(STDIN));
    if (strtolower($confirm) !== 'yes') {
        echo "Aborted - no changes written.\n";
        exit(1);
    }
}

$pdo->beginTransaction();
try {
    foreach ($totalChanges as $c) {
        $sql = "UPDATE `{$c['table']}` SET `{$c['col']}` = :val WHERE `{$c['id_col']}` = :id";
        $pdo->prepare($sql)->execute(['val' => $c['after'], 'id' => $c['id']]);
    }
    $pdo->commit();
    echo "Applied " . count($totalChanges) . " fix(es) successfully.\n";
} catch (\Throwable $e) {
    $pdo->rollBack();
    echo "FAILED, rolled back: " . $e->getMessage() . "\n";
    exit(1);
}
