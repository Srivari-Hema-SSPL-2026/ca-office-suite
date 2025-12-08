# Database Migrations

This directory contains database migration scripts for the CA Office Suite.

## Scripts

### import_clients_csv.py

Imports client and engagement data from `docs/Data/Clients_Control_Account_IT.csv` into PostgreSQL.

**Prerequisites:**
- PostgreSQL database created and running
- Schema applied (see `docs/database/schema.sql`)
- Python 3.x with psycopg2 installed

**Installation:**
```bash
pip install psycopg2-binary
```

**Usage:**
```bash
# Set database connection string
export DATABASE_URL='postgresql://user:password@localhost:5432/caoffice'

# Run the import script
python tools/migrations/import_clients_csv.py
```

**Features:**
- Validates all data before import (UUID, PAN format, file numbers)
- Upserts clients (creates or updates existing records)
- Inserts engagements with proper foreign key relationships
- Transaction-based (all or nothing)
- Logs errors to `tools/migrations/logs/`

**Expected Output:**
```
================================================================================
CA Office Suite - CSV Import Migration
================================================================================
Starting import from: .../docs/Data/Clients_Control_Account_IT.csv
Log file: .../tools/migrations/logs/import_errors_YYYYMMDD_HHMMSS.log
Valid rows to import: 30
Starting database transaction...
Inserted new client: 8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54 - Sri Associates
================================================================================
Import completed successfully!
  Clients processed: 1
  Engagements inserted: 30
================================================================================
```

## Logs

All import logs are stored in the `logs/` directory with timestamps for debugging and audit purposes.
