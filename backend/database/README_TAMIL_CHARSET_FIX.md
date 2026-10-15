# Tamil charset bug — root cause & fix

## Root cause (confirmed, not guessed)

**The data is corrupted at rest in the database.** It is not a connection-charset,
collation, or HTTP header problem — those were all already configured correctly.
Confirmed by importing `veg_pos_full_dump.sql` (a dump of the live data) into a
local MySQL instance and inspecting the raw bytes:

```sql
SELECT name_ta, HEX(name_ta) FROM items WHERE name_en='Tomato';
-- name_ta: α«ñα«òα»ìα«òα«╛α«│α«┐
-- hex:     CEB1C2ABC3B1CEB1C2ABC3B2CEB1C2BBC3AC...
```

That is not what correct UTF-8 Tamil looks like, and it is not fixed by changing
how the connection or the browser *reads* it — the wrong bytes are what's stored.

### How it got corrupted

The garbled text decodes perfectly via a **CP437** round-trip (confirmed with
`iconv('UTF-8','CP437', $value)` — tested below, exact byte match):

```
தக்காளி  --[encoded as UTF-8]-->  E0 AE A4 E0 AE 95 ...
       --[one of those import paths misread the bytes as CP437]-->
α«ñα«òα»ì...  --[re-encoded as UTF-8 for storage]-->  CE B1 C2 AB C3 B1 ...  (what's actually stored)
```

CP437 is the old DOS/Windows **console** codepage. This specific corruption
happens when a `.sql` file containing literal UTF-8 Tamil text is imported via
`mysql.exe` **from a Windows terminal without `--default-character-set=utf8mb4`**
— the Windows console's own codepage silently transcodes the bytes before MySQL
ever sees them declared as UTF-8. (This is distinct from the "stored as latin1"
corruption most guides cover — the standard `CONVERT(... USING latin1)` SQL
trick does **not** fix this; see "What does NOT work" below.)

### What was already correct (ruled out)

All verified directly against the production dump / current code:

| Item | Status |
|---|---|
| PDO DSN `charset=utf8mb4` | ✅ already set (`config/database.php`) |
| `PDO::MYSQL_ATTR_INIT_COMMAND` → `SET NAMES utf8mb4` | ✅ already set |
| `Content-Type: application/json; charset=utf-8` | ✅ already set (`Response.php`) |
| `json_encode(..., JSON_UNESCAPED_UNICODE)` | ✅ already set |
| Database/table/column collation | ✅ `utf8mb4` / `utf8mb4_0900_ai_ci` **everywhere**, verified via `information_schema` against the actual dump |
| `<meta charset="UTF-8">` first in `<head>` | ✅ already correct |

**Added anyway as defense-in-depth** (cheap, correct, doesn't hurt): `AddDefaultCharset UTF-8`
in both `backend/public/.htaccess` and the new `frontend/public/.htaccess`.

None of the above caused this bug, and none of them will fix it — the stored
bytes have to be repaired.

## The fix

### (a) Re-import command (for a **fresh install only** — see caveat)

```bash
mysql --default-character-set=utf8mb4 -u YOUR_USER -p YOUR_DB < schema.sql
mysql --default-character-set=utf8mb4 -u YOUR_USER -p YOUR_DB < seed.sql
```

**Caveat:** `seed.sql` only contains the ~65 seeded rows (items, payment
methods, default settings) — it does **not** contain your actual business data
(real parties, bills, purchases, custom item names, notes). There is no clean
"original" dump of *that* data to re-import from — it was typed directly into
production and corrupted on the way in. Re-importing seed.sql will fix the
seeded tables but cannot recover transactional data; use (b) for that.

### (b) Tested repair script (handles everything, including business data)

`database/fix_tamil_mojibake.php` — reverses the exact CP437 round-trip above.
**Tested against the real corrupted production dump**: 165/165 rows fixed
correctly (items, payment_methods, parties, bills, bill_lines, purchase_lines,
settings), verified byte-for-byte against the expected correct UTF-8, and
confirmed idempotent (re-running finds 0 rows left to fix).

It is safe to run blind — it cannot corrupt already-correct text:
`iconv('UTF-8','CP437', $value)` only *succeeds* when every character in
`$value` has a CP437 code point. Real Tamil (U+0B80–U+0BFF) has none, so it
fails closed and the row is left untouched; plain English round-trips to
itself (a provable no-op). Only actually-corrupted rows survive the round trip.

```bash
# 1. Backup first (always, even though the script only touches rows it's sure about):
mysqldump --default-character-set=utf8mb4 -u USER -p DBNAME > backup_before_fix.sql

# 2. Dry run — prints every row it WOULD change, writes nothing:
cd backend
php database/fix_tamil_mojibake.php

# 3. Review the diff. If it looks right, apply it:
php database/fix_tamil_mojibake.php --apply
```

Run this against **production's** `.env` (not a local copy) — it uses the
app's own `config/database.php`, so whatever DB that file points at is what
gets fixed.

### What does NOT work (tested, for the record)

```sql
-- Both return NULL on this data — proves it's CP437, not latin1/cp850,
-- and proves MySQL can't do this conversion on its own (it has no cp437 charset):
SELECT CONVERT(CAST(CONVERT(name_ta USING latin1) AS BINARY) USING utf8mb4) FROM items;
SELECT CONVERT(CAST(CONVERT(name_ta USING cp850) AS BINARY) USING utf8mb4) FROM items;
```
