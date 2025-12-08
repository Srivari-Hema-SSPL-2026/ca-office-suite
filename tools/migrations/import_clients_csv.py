#!/usr/bin/env python3
"""
CSV Import Migration Script for CA Office Suite
Version: 1.0
Created: December 8, 2025

Description:
    Imports client and engagement data from Clients_Control_Account_IT.csv
    into PostgreSQL database. Validates data and creates proper relationships.

Usage:
    python import_clients_csv.py

Environment Variables Required:
    DATABASE_URL - PostgreSQL connection string
                   Format: postgresql://user:password@host:port/database
                   Example: postgresql://postgres:password@localhost:5432/caoffice

Features:
    - Validates UUID format for Serial Number
    - Validates PAN format (5 letters + 4 digits + 1 letter)
    - Validates File_Number as integer
    - Upserts clients (creates if not exists, updates if exists)
    - Inserts engagements with foreign key relationships
    - Logs validation errors to tools/migrations/logs/import_errors.log
    - Transaction-based import (all or nothing)
"""

import csv
import os
import sys
import logging
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from uuid import UUID

try:
    import psycopg2
    from psycopg2.extras import execute_values
except ImportError:
    print("ERROR: psycopg2 is not installed.")
    print("Please install it with: pip install psycopg2-binary")
    sys.exit(1)


# ============================================================================
# Configuration
# ============================================================================

# Get the repository root directory
REPO_ROOT = Path(__file__).parent.parent.parent
CSV_FILE = REPO_ROOT / "docs" / "Data" / "Clients_Control_Account_IT.csv"
LOG_DIR = Path(__file__).parent / "logs"
LOG_FILE = LOG_DIR / f"import_errors_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

# Ensure log directory exists
LOG_DIR.mkdir(parents=True, exist_ok=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)


# ============================================================================
# Validation Functions
# ============================================================================

def validate_uuid(value: str) -> Tuple[bool, Optional[str]]:
    """Validate UUID format."""
    try:
        UUID(value)
        return True, None
    except (ValueError, AttributeError):
        return False, f"Invalid UUID format: {value}"


def validate_pan(value: str) -> Tuple[bool, Optional[str]]:
    """Validate PAN format: 5 letters + 4 digits + 1 letter."""
    if not value:
        return False, "PAN is empty"
    
    pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]$'
    if re.match(pattern, value):
        return True, None
    return False, f"Invalid PAN format: {value} (expected: XXXXX9999X)"


def validate_file_number(value: Any) -> Tuple[bool, Optional[str], Optional[int]]:
    """Validate file number as integer."""
    try:
        file_num = int(value)
        return True, None, file_num
    except (ValueError, TypeError):
        return False, f"Invalid file number: {value} (must be integer)", None


def validate_row(row_num: int, row: Dict[str, str]) -> Tuple[bool, List[str]]:
    """
    Validate a single CSV row.
    Returns: (is_valid, error_messages)
    """
    errors = []
    
    # Validate Serial Number (UUID)
    serial_valid, serial_error = validate_uuid(row.get('Serial Number', ''))
    if not serial_valid:
        errors.append(f"Row {row_num}: {serial_error}")
    
    # Validate PAN
    pan_valid, pan_error = validate_pan(row.get('PAN', ''))
    if not pan_valid:
        errors.append(f"Row {row_num}: {pan_error}")
    
    # Validate File_Number
    file_valid, file_error, _ = validate_file_number(row.get('File_Number', ''))
    if not file_valid:
        errors.append(f"Row {row_num}: {file_error}")
    
    # Validate required fields
    required_fields = ['Client_Name', 'Type', 'Status']
    for field in required_fields:
        if not row.get(field, '').strip():
            errors.append(f"Row {row_num}: Missing required field '{field}'")
    
    return len(errors) == 0, errors


# ============================================================================
# Database Operations
# ============================================================================

def get_db_connection():
    """Get database connection from environment variable."""
    db_url = os.environ.get('DATABASE_URL')
    
    if not db_url:
        logger.error("DATABASE_URL environment variable is not set")
        logger.error("Example: export DATABASE_URL='postgresql://user:pass@localhost:5432/caoffice'")
        sys.exit(1)
    
    try:
        conn = psycopg2.connect(db_url)
        return conn
    except psycopg2.Error as e:
        logger.error(f"Failed to connect to database: {e}")
        sys.exit(1)


def upsert_client(cursor, client_id: str, name: str, pan: str) -> bool:
    """
    Upsert a client record.
    If client_id exists, update the record. Otherwise, insert new.
    """
    try:
        # Check if client exists
        cursor.execute(
            "SELECT id FROM clients WHERE id = %s",
            (client_id,)
        )
        exists = cursor.fetchone() is not None
        
        if exists:
            # Update existing client
            cursor.execute(
                """
                UPDATE clients 
                SET name = %s, pan = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                """,
                (name, pan, client_id)
            )
            logger.debug(f"Updated client: {client_id} - {name}")
        else:
            # Insert new client
            cursor.execute(
                """
                INSERT INTO clients (id, name, pan, status, created_at, updated_at)
                VALUES (%s, %s, %s, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """,
                (client_id, name, pan)
            )
            logger.info(f"Inserted new client: {client_id} - {name}")
        
        return True
    except psycopg2.Error as e:
        logger.error(f"Failed to upsert client {client_id}: {e}")
        return False


def insert_engagement(cursor, client_id: str, engagement_data: Dict) -> bool:
    """Insert an engagement record."""
    try:
        cursor.execute(
            """
            INSERT INTO engagements (
                client_id, file_number, file_number_as_per,
                type, type2, senior, assistant, status,
                created_at, updated_at
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT (client_id, file_number) DO UPDATE
            SET 
                file_number_as_per = EXCLUDED.file_number_as_per,
                type = EXCLUDED.type,
                type2 = EXCLUDED.type2,
                senior = EXCLUDED.senior,
                assistant = EXCLUDED.assistant,
                status = EXCLUDED.status,
                updated_at = CURRENT_TIMESTAMP
            """,
            (
                client_id,
                engagement_data['file_number'],
                engagement_data['file_number_as_per'],
                engagement_data['type'],
                engagement_data['type2'],
                engagement_data['senior'],
                engagement_data['assistant'],
                engagement_data['status']
            )
        )
        return True
    except psycopg2.Error as e:
        logger.error(f"Failed to insert engagement: {e}")
        logger.error(f"Engagement data: {engagement_data}")
        return False


# ============================================================================
# Main Import Logic
# ============================================================================

def import_csv():
    """Main function to import CSV data."""
    
    # Check if CSV file exists
    if not CSV_FILE.exists():
        logger.error(f"CSV file not found: {CSV_FILE}")
        sys.exit(1)
    
    logger.info(f"Starting import from: {CSV_FILE}")
    logger.info(f"Log file: {LOG_FILE}")
    
    # Read and validate CSV
    rows_data = []
    validation_errors = []
    
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row_num, row in enumerate(reader, start=2):  # Start at 2 (row 1 is header)
                is_valid, errors = validate_row(row_num, row)
                if is_valid:
                    rows_data.append(row)
                else:
                    validation_errors.extend(errors)
    except Exception as e:
        logger.error(f"Failed to read CSV file: {e}")
        sys.exit(1)
    
    # Log validation errors
    if validation_errors:
        logger.warning(f"Found {len(validation_errors)} validation errors:")
        for error in validation_errors:
            logger.warning(f"  {error}")
    
    logger.info(f"Valid rows to import: {len(rows_data)}")
    
    if not rows_data:
        logger.error("No valid rows to import")
        sys.exit(1)
    
    # Connect to database and import
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Start transaction
        logger.info("Starting database transaction...")
        
        # Track unique clients
        clients_processed = set()
        engagements_inserted = 0
        
        for row in rows_data:
            client_id = row['Serial Number']
            client_name = row['Client_Name']
            pan = row['PAN']
            
            # Upsert client (only once per unique client_id)
            if client_id not in clients_processed:
                if upsert_client(cursor, client_id, client_name, pan):
                    clients_processed.add(client_id)
            
            # Insert engagement
            _, _, file_num = validate_file_number(row['File_Number'])
            engagement_data = {
                'file_number': file_num,
                'file_number_as_per': row.get('File_Number_As_Per', ''),
                'type': row['Type'],
                'type2': row.get('Type2', ''),
                'senior': row.get('Senior', ''),
                'assistant': row.get('Assistant', ''),
                'status': row['Status']
            }
            
            if insert_engagement(cursor, client_id, engagement_data):
                engagements_inserted += 1
        
        # Commit transaction
        conn.commit()
        logger.info("=" * 80)
        logger.info("Import completed successfully!")
        logger.info(f"  Clients processed: {len(clients_processed)}")
        logger.info(f"  Engagements inserted: {engagements_inserted}")
        logger.info("=" * 80)
        
    except Exception as e:
        conn.rollback()
        logger.error(f"Import failed, rolled back transaction: {e}")
        sys.exit(1)
    finally:
        cursor.close()
        conn.close()


# ============================================================================
# Entry Point
# ============================================================================

if __name__ == "__main__":
    logger.info("=" * 80)
    logger.info("CA Office Suite - CSV Import Migration")
    logger.info("=" * 80)
    
    import_csv()
