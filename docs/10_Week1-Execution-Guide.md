---
document_type: "Execution Guide"
version: "1.0"
status: "Active"
audience: ["Developers"]
---

# Week 1: Client Engagement System - Execution Guide

**Version**: 1.0  
**Last Updated**: December 8, 2025

---

## Overview

This guide provides step-by-step instructions to set up and run the Week 1 Client Engagement Management System vertical slice, including:

1. PostgreSQL database setup
2. Schema application
3. CSV data import
4. FastAPI backend startup
5. React frontend startup

---

## Prerequisites

### Required Software

- **PostgreSQL** 14+ (database server)
- **Python** 3.12+ (for FastAPI backend and data import)
- **Node.js** 18+ (for React frontend)
- **Git** (for repository management)

### Installation

**Windows (PowerShell):**
```powershell
# Install PostgreSQL
winget install PostgreSQL.PostgreSQL

# Install Python
winget install Python.Python.3.12

# Install Node.js
winget install OpenJS.NodeJS

# Verify installations
psql --version
python --version
node --version
npm --version
```

**macOS:**
```bash
# Install PostgreSQL
brew install postgresql@14

# Install Python
brew install python@3.12

# Install Node.js
brew install node

# Verify installations
psql --version
python3 --version
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Install Python
sudo apt install python3.12 python3-pip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
psql --version
python3 --version
node --version
npm --version
```

---

## Step 1: PostgreSQL Database Setup

### 1.1 Start PostgreSQL Service

**Windows:**
```powershell
# Start PostgreSQL service
Start-Service postgresql-x64-14

# Or use Services app (services.msc)
```

**macOS:**
```bash
brew services start postgresql@14
```

**Linux:**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 1.2 Create Database

```bash
# Connect as postgres user
sudo -u postgres psql

# Or on Windows (from psql command)
psql -U postgres
```

In PostgreSQL shell:
```sql
-- Create database
CREATE DATABASE caoffice;

-- Create user (optional, for security)
CREATE USER caoffice_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE caoffice TO caoffice_user;

-- Exit
\q
```

### 1.3 Verify Connection

```bash
# Test connection
psql -U postgres -d caoffice -c "SELECT version();"

# Or with custom user
psql -U caoffice_user -d caoffice -c "SELECT version();"
```

---

## Step 2: Apply Database Schema

### 2.1 Locate Schema File

The schema file is located at:
```
docs/database/schema.sql
```

### 2.2 Apply Schema

**Option 1: Using psql command**
```bash
# Navigate to repository root
cd path/to/ca-office-suite

# Apply schema
psql -U postgres -d caoffice -f docs/database/schema.sql
```

**Option 2: Using pgAdmin or other GUI**
1. Open pgAdmin
2. Connect to PostgreSQL server
3. Right-click on `caoffice` database
4. Select "Query Tool"
5. Open `docs/database/schema.sql`
6. Execute the script (F5)

### 2.3 Verify Tables Created

```bash
psql -U postgres -d caoffice -c "\dt"
```

Expected output:
```
             List of relations
 Schema |    Name     | Type  |  Owner   
--------+-------------+-------+----------
 public | clients     | table | postgres
 public | engagements | table | postgres
```

---

## Step 3: Import CSV Data

### 3.1 Install Python Dependencies

```bash
# Navigate to repository root
cd path/to/ca-office-suite

# Install psycopg2 for PostgreSQL connection
pip install psycopg2-binary
```

### 3.2 Set Database Connection

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/caoffice"
```

**macOS/Linux:**
```bash
export DATABASE_URL='postgresql://postgres:password@localhost:5432/caoffice'
```

**Or create a .env file** (recommended for development):
```bash
# In repository root, create .env
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/caoffice" > .env
```

### 3.3 Run Import Script

```bash
# Navigate to repository root
cd path/to/ca-office-suite

# Run import
python tools/migrations/import_clients_csv.py
```

### 3.4 Verify Import

Expected output:
```
================================================================================
CA Office Suite - CSV Import Migration
================================================================================
Starting import from: .../docs/Data/Clients_Control_Account_IT.csv
Log file: .../tools/migrations/logs/import_errors_20251208_120000.log
Valid rows to import: 30
Starting database transaction...
Inserted new client: 8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54 - Sri Associates
================================================================================
Import completed successfully!
  Clients processed: 1
  Engagements inserted: 30
================================================================================
```

Check data in database:
```bash
psql -U postgres -d caoffice -c "SELECT COUNT(*) FROM clients;"
# Expected: 1

psql -U postgres -d caoffice -c "SELECT COUNT(*) FROM engagements;"
# Expected: 30
```

---

## Step 4: Start FastAPI Backend

### 4.1 Install Python Dependencies

```bash
# Navigate to API directory
cd path/to/ca-office-suite/src/api

# Install dependencies
pip install -r requirements.txt
```

### 4.2 Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/caoffice"
```

**macOS/Linux:**
```bash
export DATABASE_URL='postgresql://postgres:password@localhost:5432/caoffice'
```

**Or create .env file** in `src/api/`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/caoffice
DEBUG=False
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

### 4.3 Start the Server

**Development Mode (with auto-reload):**
```bash
cd src/api
uvicorn main:app --reload --port 8000
```

**Production Mode:**
```bash
cd src/api
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 4.4 Verify API is Running

Open browser and navigate to:
- **Swagger UI**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Root**: http://localhost:8000/

Expected response from health check:
```json
{
  "status": "healthy",
  "service": "CA Office Suite API",
  "version": "1.0.0"
}
```

### 4.5 Test API Endpoints

**Get all clients:**
```bash
curl http://localhost:8000/api/clients
```

**Get specific client:**
```bash
curl http://localhost:8000/api/clients/8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54
```

**Get client engagements:**
```bash
curl http://localhost:8000/api/clients/8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54/engagements
```

---

## Step 5: Start React Frontend

### 5.1 Install Node Dependencies

```bash
# Navigate to frontend directory
cd path/to/ca-office-suite/src/CAOfficeSuite.Web

# Install dependencies
npm install
```

### 5.2 Configure API URL

**Create .env file** in `src/CAOfficeSuite.Web/`:
```env
VITE_API_URL=http://localhost:8000/api
```

Or copy from example:
```bash
cp .env.example .env
```

### 5.3 Start Development Server

```bash
cd src/CAOfficeSuite.Web
npm run dev
```

Expected output:
```
  VITE v7.2.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5.4 Access the Application

Open browser and navigate to:
- **Frontend**: http://localhost:5173/

Login with any email (mock authentication):
- Email: `admin@caoffice.com`
- Password: any (4+ characters)

Navigate to **Clients** page to see real data from API.

---

## Troubleshooting

### PostgreSQL Connection Issues

**Error**: `could not connect to server`

**Solution**:
```bash
# Check if PostgreSQL is running
# Windows
Get-Service postgresql-x64-14

# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Start if not running
sudo systemctl start postgresql
```

### FastAPI Import Errors

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd src/api
pip install -r requirements.txt
```

### CORS Errors in Frontend

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Ensure FastAPI is running on port 8000
2. Check `src/api/config.py` has correct CORS origins
3. Verify frontend is running on port 5173

### Database Schema Errors

**Error**: `relation "clients" does not exist`

**Solution**:
```bash
# Reapply schema
psql -U postgres -d caoffice -f docs/database/schema.sql
```

### Frontend API Connection Issues

**Error**: API calls failing with network errors

**Solution**:
1. Verify FastAPI is running: http://localhost:8000/health
2. Check `.env` file has correct `VITE_API_URL`
3. Restart React dev server after changing `.env`

---

## Complete Startup Script

**Windows (PowerShell):**
```powershell
# Terminal 1: Start PostgreSQL (if not running as service)
Start-Service postgresql-x64-14

# Terminal 2: Start FastAPI
cd path\to\ca-office-suite\src\api
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/caoffice"
uvicorn main:app --reload --port 8000

# Terminal 3: Start React
cd path\to\ca-office-suite\src\CAOfficeSuite.Web
npm run dev
```

**macOS/Linux:**
```bash
# Terminal 1: Start PostgreSQL (if not running as service)
brew services start postgresql@14
# or
sudo systemctl start postgresql

# Terminal 2: Start FastAPI
cd path/to/ca-office-suite/src/api
export DATABASE_URL='postgresql://postgres:password@localhost:5432/caoffice'
uvicorn main:app --reload --port 8000

# Terminal 3: Start React
cd path/to/ca-office-suite/src/CAOfficeSuite.Web
npm run dev
```

---

## Verification Checklist

After completing all steps, verify:

- [ ] PostgreSQL is running and accessible
- [ ] `caoffice` database exists with `clients` and `engagements` tables
- [ ] 1 client and 30 engagements imported from CSV
- [ ] FastAPI is running at http://localhost:8000
- [ ] Swagger docs accessible at http://localhost:8000/docs
- [ ] API health check returns "healthy"
- [ ] React dev server running at http://localhost:5173
- [ ] Can login to frontend
- [ ] Clients page shows "Sri Associates" client
- [ ] Client detail page shows 30 engagements
- [ ] No console errors in browser or terminal

---

## Next Steps

After successful setup:

1. Explore the Swagger UI to test all API endpoints
2. Test pagination, filtering, and sorting in the Clients page
3. Try creating, updating, and deleting clients via API
4. Review the code structure and understand the data flow
5. Prepare for Week 2 features (Task Management)

---

## Additional Resources

- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **React Documentation**: https://react.dev/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Project Requirements**: `docs/01_Requirements.md`
- **Architecture Overview**: `docs/02_Architecture.md`
- **API README**: `src/api/README.md`

---

## Support

For issues or questions:

1. Check this guide's Troubleshooting section
2. Review API logs in terminal
3. Check browser console for frontend errors
4. Review import logs in `tools/migrations/logs/`
5. Consult project documentation in `docs/` directory
