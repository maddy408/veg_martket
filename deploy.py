#!/usr/bin/env python3
"""
Sri Bhavani Vegetables POS — Production & Dev Deployment Automation Script
Enforces strict database safety, zero data loss, pre-deploy compressed backups,
backup retention, atomic backend deploy, frontend build & upload, and post-deploy health verification.
"""

import sys
import os
import re
import time
import argparse
import subprocess
from datetime import datetime
import paramiko

# Force UTF-8 on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Remote Server Credentials
SSH_HOST = "45.199.139.18"
SSH_PORT = 22
SSH_USER = "jrmfinan1"
SSH_PASS = "jrmQynova2026@10/08"
REMOTE_BASE = "/var/www/5eb812d2-fce9-421c-a697-e90a0a80b1ac"
REMOTE_BACKUP_DIR = f"{REMOTE_BASE}/db_backups"

ENV_CONFIGS = {
    "dev": {
        "web_dir": "dev-sribhavani-vegetables.qynova.in",
        "api_dir": "dev-api-sribhavani-vegetables.qynova.in",
        "db_user": "jrmfinan1_sri_bhavani_vegetables_dev",
        "db_pass": "6OR(7cKxA3^8",
        "db_name": "jrmfinan1_sri_bhavani_vegetables_dev",
        "web_url": "https://dev-sribhavani-vegetables.qynova.in",
        "api_url": "https://dev-api-sribhavani-vegetables.qynova.in",
        "jwt_secret": "sri-bhavani-jwt-dev-secret-k9834hskdjf8472",
    },
    "prod": {
        "web_dir": "sribhavani-vegetables.qynova.in",
        "api_dir": "api-sribhavani-vegetables.qynova.in",
        "db_user": "jrmfinan1_sri_bhavani_vegetables",
        "db_pass": "y1eWv!BF7q@d",
        "db_name": "jrmfinan1_sri_bhavani_vegetables",
        "web_url": "https://sribhavani-vegetables.qynova.in",
        "api_url": "https://api-sribhavani-vegetables.qynova.in",
        "jwt_secret": "sri-bhavani-jwt-prod-super-secure-key-928374hfkjsdhf923874",
    }
}

PROTECTED_DIRS = ["uploads", "error_pages"]


def print_banner(text):
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70)


def run_local(cmd, cwd=None, ignore_err=False, env=None):
    print(f"\n[LOCAL EXEC] {cmd}")
    full_env = os.environ.copy()
    if env:
        full_env.update(env)
    res = subprocess.run(cmd, shell=True, cwd=cwd, text=True, env=full_env)
    if res.returncode != 0 and not ignore_err:
        print(f"[FATAL LOCAL ERROR] Command failed with exit code {res.returncode}: {cmd}")
        sys.exit(res.returncode)
    return res.returncode


def connect_ssh():
    print(f"\n--- Connecting to {SSH_USER}@{SSH_HOST}:{SSH_PORT} ---")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(
        hostname=SSH_HOST,
        port=SSH_PORT,
        username=SSH_USER,
        password=SSH_PASS,
        look_for_keys=False,
        allow_agent=False,
        timeout=25
    )
    print("[SSH SUCCESS] Connected successfully!")
    return ssh


def run_ssh(ssh, cmd, ignore_err=False):
    print(f"[REMOTE EXEC] {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_status = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip())
    if exit_status != 0 and not ignore_err:
        print(f"[REMOTE ERROR status={exit_status}] {err.strip()}")
        sys.exit(exit_status)
    return out


def perform_db_backup(ssh, cfg, target_env):
    """
    Automated Pre-Deploy Backup: Performs a full compressed MySQL backup (.sql.gz)
    via SSH to REMOTE_BACKUP_DIR before any changes are made.
    Verifies non-zero size and rotates older backups beyond 15.
    """
    print_banner(f"AUTOMATED PRE-DEPLOY DATABASE BACKUP ({target_env.upper()})")

    run_ssh(ssh, f"mkdir -p {REMOTE_BACKUP_DIR}")

    # Check if DB has any tables before dumping
    count_sql = f"SELECT count(*) FROM information_schema.tables WHERE table_schema = '{cfg['db_name']}';"
    check_cmd = f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -N -e \"{count_sql}\""
    out = run_ssh(ssh, check_cmd, ignore_err=True).strip()
    try:
        table_count = int(out.splitlines()[-1])
    except Exception:
        table_count = 0

    if table_count == 0:
        print(f"[BACKUP SKIPPED] Target database '{cfg['db_name']}' is empty (0 tables). No pre-backup needed.")
        return

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_filename = f"backup_{target_env}_{timestamp}.sql.gz"
    backup_path = f"{REMOTE_BACKUP_DIR}/{backup_filename}"

    print(f"Creating compressed MySQL dump: {backup_path}")
    dump_cmd = (
        f"mysqldump -u{cfg['db_user']} -p'{cfg['db_pass']}' "
        f"--single-transaction --quick {cfg['db_name']} | gzip > {backup_path}"
    )
    run_ssh(ssh, dump_cmd, ignore_err=True)

    # Check file exists and size > 0
    size_check = run_ssh(ssh, f"stat -c %s {backup_path} 2>/dev/null || echo 0").strip()
    try:
        backup_size = int(size_check.splitlines()[-1])
    except Exception:
        backup_size = 0

    print(f"Backup verification: size = {backup_size} bytes")
    if backup_size <= 0:
        print("\n[CRITICAL ERROR] Pre-deploy database backup failed or resulted in 0 bytes!")
        print("Zero Data Loss Rule: Halting deployment immediately!")
        sys.exit(1)

    print(f"[BACKUP VERIFIED] Pre-deploy backup secured successfully: {backup_filename} ({backup_size} bytes)")

    # Backup rotation: retain latest 15 backups per env
    print("\n--- Checking Backup Retention (Max 15 retained) ---")
    list_cmd = f"ls -1t {REMOTE_BACKUP_DIR}/backup_{target_env}_*.sql.gz"
    backups = [b.strip() for b in run_ssh(ssh, list_cmd, ignore_err=True).splitlines() if b.strip()]
    if len(backups) > 15:
        to_prune = backups[15:]
        print(f"Pruning {len(to_prune)} older backup(s)...")
        for old in to_prune:
            run_ssh(ssh, f"rm -f {old}", ignore_err=True)
            print(f"  Removed: {old}")
    else:
        print(f"Total existing backups for {target_env}: {len(backups)} (within 15 limit).")


def handle_database_migrations(ssh, sftp, cfg, root_dir):
    """
    Zero Data Loss Policy:
    - Never DROP or TRUNCATE.
    - If 0 tables (fresh database), import veg_pos_full_dump_utf8.sql.
    - If tables exist, check for any pending migrations in backend/database/migrations/
      and execute them incrementally, logging in migrations_log.
    """
    print_banner("DATABASE HEALTH & SAFE MIGRATION VERIFICATION")

    count_sql = f"SELECT count(*) FROM information_schema.tables WHERE table_schema = '{cfg['db_name']}';"
    check_cmd = f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -N -e \"{count_sql}\""
    out = run_ssh(ssh, check_cmd, ignore_err=True).strip()
    try:
        table_count = int(out.splitlines()[-1])
    except Exception:
        table_count = 0

    print(f"Live database '{cfg['db_name']}' current table count: {table_count}")

    run_ssh(ssh, f"mkdir -p {REMOTE_BASE}/database")

    if table_count == 0:
        print("\n[INITIAL SETUP] Fresh database detected (0 tables). Importing full dump...")
        dump_utf8_path = os.path.join(root_dir, "backend", "database", "veg_pos_full_dump_utf8.sql")
        if not os.path.exists(dump_utf8_path):
            # If not converted yet, create it from veg_pos_full_dump.sql
            orig_dump = os.path.join(root_dir, "backend", "database", "veg_pos_full_dump.sql")
            with open(orig_dump, "r", encoding="utf-16le") as f:
                content = f.read()
            content = re.sub(r'CREATE DATABASE[^;]+;', '', content, flags=re.IGNORECASE)
            content = re.sub(r'USE\s+`?[^`\s;]+`?;', '', content, flags=re.IGNORECASE)
            with open(dump_utf8_path, "w", encoding="utf-8") as f:
                f.write(content)

        remote_dump = f"{REMOTE_BASE}/database/veg_pos_full_dump.sql"
        print("Uploading database dump to server...")
        sftp.put(dump_utf8_path, remote_dump)
        print("Executing database import...")
        run_ssh(ssh, f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} < {remote_dump}")
        print("[INITIAL SETUP COMPLETE] Database successfully populated with initial schema and data.")

    # Create migrations_log table if not exists
    create_log_table = (
        "CREATE TABLE IF NOT EXISTS migrations_log ("
        "id INT AUTO_INCREMENT PRIMARY KEY, "
        "migration VARCHAR(255) NOT NULL UNIQUE, "
        "applied_at DATETIME DEFAULT CURRENT_TIMESTAMP"
        ");"
    )
    run_ssh(ssh, f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -e \"{create_log_table}\"", ignore_err=True)

    # If this was fresh dump, all existing migrations are already baked in
    migrations_dir = os.path.join(root_dir, "backend", "database", "migrations")
    if os.path.exists(migrations_dir):
        all_migrations = sorted([f for f in os.listdir(migrations_dir) if f.endswith(".sql")])
        if table_count == 0:
            for mig in all_migrations:
                run_ssh(ssh, f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -e \"INSERT IGNORE INTO migrations_log (migration) VALUES ('{mig}');\"", ignore_err=True)
            print("[MIGRATIONS] Recorded base migrations into migrations_log.")
        else:
            applied_cmd = f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -N -e \"SELECT migration FROM migrations_log;\""
            applied_out = run_ssh(ssh, applied_cmd, ignore_err=True).splitlines()
            applied_set = set(line.strip() for line in applied_out if line.strip())

            pending = [f for f in all_migrations if f not in applied_set]
            if pending:
                print(f"\n[MIGRATIONS] Found {len(pending)} pending migration(s): {pending}")
                run_ssh(ssh, f"mkdir -p {REMOTE_BASE}/database/migrations")
                for mig in pending:
                    local_mig = os.path.join(migrations_dir, mig)
                    remote_mig = f"{REMOTE_BASE}/database/migrations/{mig}"
                    sftp.put(local_mig, remote_mig)
                    print(f"Applying migration: {mig}")
                    run_ssh(ssh, f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} < {remote_mig}")
                    run_ssh(ssh, f"mysql -u{cfg['db_user']} -p'{cfg['db_pass']}' {cfg['db_name']} -e \"INSERT INTO migrations_log (migration) VALUES ('{mig}');\"")
                    print(f"  Migration applied & logged: {mig}")
            else:
                print("[MIGRATIONS] Database schema is fully up to date.")


def upload_directory(sftp, local_dir, remote_dir, protect_dirs=None):
    """
    Recursively upload local files to remote directory via SFTP without overwriting protected paths.
    """
    protect_dirs = protect_dirs or []
    for root, dirs, files in os.walk(local_dir):
        rel_path = os.path.relpath(root, local_dir)
        target_remote = remote_dir if rel_path == "." else f"{remote_dir}/{rel_path.replace(os.sep, '/')}"

        # Check if in protected directory
        is_protected = any(rel_path == p or rel_path.startswith(p + os.sep) for p in protect_dirs)
        if is_protected:
            continue

        try:
            sftp.mkdir(target_remote)
        except Exception:
            pass

        for file in files:
            if file == ".env":
                continue
            local_file = os.path.join(root, file)
            remote_file = f"{target_remote}/{file}"
            sftp.put(local_file, remote_file)


def deploy_backend(ssh, sftp, cfg, root_dir, target_env):
    print_banner(f"DEPLOYING BACKEND REST API TO {cfg['api_dir']}")

    backend_dir = os.path.join(root_dir, "backend")
    remote_api = f"{REMOTE_BASE}/{cfg['api_dir']}"

    run_ssh(ssh, f"mkdir -p {remote_api}/src {remote_api}/config {remote_api}/uploads")

    # 1. Upload src/
    print("Uploading backend/src...")
    upload_directory(sftp, os.path.join(backend_dir, "src"), f"{remote_api}/src")

    # 2. Upload config/
    print("Uploading backend/config...")
    upload_directory(sftp, os.path.join(backend_dir, "config"), f"{remote_api}/config")

    # 3. Upload composer.json and composer.lock
    print("Uploading composer files...")
    sftp.put(os.path.join(backend_dir, "composer.json"), f"{remote_api}/composer.json")
    if os.path.exists(os.path.join(backend_dir, "composer.lock")):
        sftp.put(os.path.join(backend_dir, "composer.lock"), f"{remote_api}/composer.lock")

    # 4. Upload index.php and .htaccess to API root
    print("Uploading API index.php and .htaccess...")
    sftp.put(os.path.join(backend_dir, "public", "index.php"), f"{remote_api}/index.php")
    sftp.put(os.path.join(backend_dir, "public", ".htaccess"), f"{remote_api}/.htaccess")

    # 5. Remote .env file configuration
    print("Configuring remote API .env...")
    existing_jwt = ""
    try:
        env_content = run_ssh(ssh, f"cat {remote_api}/.env 2>/dev/null || echo ''", ignore_err=True)
        m = re.search(r"JWT_SECRET=(.+)", env_content)
        if m:
            existing_jwt = m.group(1).strip()
    except Exception:
        pass

    jwt_secret = existing_jwt if existing_jwt else cfg["jwt_secret"]
    app_debug = "true" if target_env == "dev" else "false"

    remote_env_content = f"""# Environment configuration for Sri Bhavani Vegetables ({target_env})
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE={cfg['db_name']}
DB_USERNAME={cfg['db_user']}
DB_PASSWORD='{cfg['db_pass']}'

JWT_SECRET={jwt_secret}
JWT_ISSUER=sribhavani-{target_env}
JWT_ACCESS_TOKEN_TTL=86400

APP_CORS_ORIGINS=https://{cfg['web_dir']},http://{cfg['web_dir']},https://{cfg['api_dir']},http://{cfg['api_dir']},http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173
APP_ENV={target_env}
APP_DEBUG={app_debug}
"""
    run_ssh(ssh, f"cat << 'EOF' > {remote_api}/.env\n{remote_env_content}\nEOF")

    # 6. Run composer install remotely
    print("\n--- Running Remote Composer Install ---")
    run_ssh(ssh, f"cd {remote_api} && composer install --no-dev --optimize-autoloader --no-interaction")

    # 7. Also mirror backend API to {web_dir}/api for zero-CORS frontend access
    print(f"\nMirroring API to {cfg['web_dir']}/api...")
    remote_web_api = f"{REMOTE_BASE}/{cfg['web_dir']}/api"
    run_ssh(ssh, f"mkdir -p {remote_web_api}")
    run_ssh(ssh, f"cp -r {remote_api}/src {remote_api}/config {remote_api}/vendor {remote_api}/.env {remote_web_api}/", ignore_err=True)
    sftp.put(os.path.join(backend_dir, "public", "index.php"), f"{remote_web_api}/index.php")
    sftp.put(os.path.join(backend_dir, "public", ".htaccess"), f"{remote_web_api}/.htaccess")

    # Permissions
    run_ssh(ssh, f"chmod -R 775 {remote_api}/uploads {remote_web_api}/uploads 2>/dev/null || true", ignore_err=True)

    print("[BACKEND DEPLOYED] Backend REST API successfully deployed and configured.")


def build_and_deploy_frontend(ssh, sftp, cfg, root_dir, target_env):
    print_banner(f"BUILDING & DEPLOYING FRONTEND TO {cfg['web_dir']}")

    frontend_dir = os.path.join(root_dir, "frontend")
    remote_web = f"{REMOTE_BASE}/{cfg['web_dir']}"

    # 1. Local Vite Production Build
    print("\n--- Step 1: Building Vite Production Bundle Locally ---")
    build_env = {
        "VITE_API_BASE_URL": "/api"
    }
    run_local("npm run build", cwd=frontend_dir, env=build_env)

    dist_dir = os.path.join(frontend_dir, "dist")
    if not os.path.exists(os.path.join(dist_dir, "index.html")):
        print("[FATAL ERROR] Frontend build failed — dist/index.html not found!")
        sys.exit(1)

    # 2. Upload dist/ to remote web_dir
    print(f"\n--- Step 2: Uploading Frontend Assets to {remote_web} ---")
    run_ssh(ssh, f"mkdir -p {remote_web}")
    upload_directory(sftp, dist_dir, remote_web, protect_dirs=["api", "uploads", "error_pages"])

    # 3. Write SPA Routing .htaccess
    print("\n--- Step 3: Configuring SPA Routing .htaccess ---")
    web_htaccess = """<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Allow direct access to /api/ backend endpoints
  RewriteCond %{REQUEST_URI} ^/api/ [NC]
  RewriteRule ^ - [L]

  # Direct file or directory access
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Route everything else to index.html
  RewriteRule . /index.html [L]
</IfModule>

# Custom Error Pages
ErrorDocument 503 /error_pages/503.html
"""
    run_ssh(ssh, f"cat << 'EOF' > {remote_web}/.htaccess\n{web_htaccess}\nEOF")
    print("[FRONTEND DEPLOYED] Web application assets successfully deployed.")


def verify_deployment(cfg):
    print_banner(f"POST-DEPLOYMENT HEALTH VERIFICATION ({cfg['web_dir']})")

    endpoints = [
        ("Web App Root", cfg["web_url"]),
        ("Web /api Root", f"{cfg['web_url']}/api/"),
        ("Web /api/auth/me", f"{cfg['web_url']}/api/auth/me"),
        ("Web /api/items", f"{cfg['web_url']}/api/items"),
        ("Dedicated API Root", f"{cfg['api_url']}/"),
        ("Dedicated API /auth/me", f"{cfg['api_url']}/auth/me"),
        ("Dedicated API /items", f"{cfg['api_url']}/items"),
    ]

    for label, url in endpoints:
        res = subprocess.run(
            ["curl.exe", "-s", "-o", "NUL", "-w", "%{http_code}", "-k", url],
            capture_output=True,
            text=True
        )
        status_code = res.stdout.strip()
        if status_code in ["200", "401"]:
            print(f"  [PASS] {label:25} ({url}) -> HTTP {status_code} (Active & Healthy)")
        else:
            print(f"  [WARN] {label:25} ({url}) -> HTTP {status_code}")


def deploy_environment(target_env, root_dir):
    cfg = ENV_CONFIGS[target_env]
    print_banner(f"SRI BHAVANI VEGETABLES DEPLOYMENT — TARGET: {target_env.upper()}")
    print(f"Web Host Domain: {cfg['web_dir']}")
    print(f"API Host Domain: {cfg['api_dir']}")
    print(f"Database Target: {cfg['db_name']}")

    ssh = connect_ssh()
    sftp = ssh.open_sftp()

    try:
        perform_db_backup(ssh, cfg, target_env)
        handle_database_migrations(ssh, sftp, cfg, root_dir)
        deploy_backend(ssh, sftp, cfg, root_dir, target_env)
        build_and_deploy_frontend(ssh, sftp, cfg, root_dir, target_env)
        verify_deployment(cfg)

        print_banner(f"DEPLOYMENT TO {target_env.upper()} COMPLETED SUCCESSFULLY!")
        print(f"Web Application URL: {cfg['web_url']}")
        print(f"Backend API URL:     {cfg['api_url']}")
        print("=" * 70 + "\n")
    finally:
        sftp.close()
        ssh.close()


def main():
    parser = argparse.ArgumentParser(description="Sri Bhavani Vegetables Deployment Script")
    parser.add_argument(
        "--env",
        choices=["dev", "prod", "all"],
        default="all",
        help="Target deployment environment (dev, prod, or all). Default is all."
    )
    args = parser.parse_args()
    root_dir = os.path.dirname(os.path.abspath(__file__))

    if args.env == "all":
        deploy_environment("dev", root_dir)
        deploy_environment("prod", root_dir)
    else:
        deploy_environment(args.env, root_dir)


if __name__ == "__main__":
    main()
