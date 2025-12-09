# Week 1 Task: Client Engagement Management System

**Task ID**: WEEK1-001  
**Created**: December 8, 2025  
**Status**: In Progress  
**Priority**: High

---

## 📋 Task Overview

Implement a complete CRUD (Create, Read, Update, Delete) system for managing client engagement data from `docs/Data/Clients_Control_Account_IT.csv`. The system should consist of three layers: **UI (React)**, **API Middle-tier (Python FastAPI)**, and **Data Store (PostgreSQL)**.

---

## 🏗️ Architecture Note

**Week 1 Implementation**: This task implements a simplified architecture for rapid development:
- React Frontend → FastAPI → PostgreSQL (direct connection)

**Future Integration (Week 2+)**: This will be integrated into the full architecture as specified in `docs/02_Architecture.md`:
- React Frontend → .NET Aspire BFF → API Gateway → FastAPI → PostgreSQL

The Week 1 implementation is designed to be easily integrated into the full architecture later. The FastAPI service will be wrapped by the API Gateway, and the React frontend will be hosted in the .NET Aspire BFF.

**Note**: Authentication/Authorization, Redis caching, and other advanced features will be implemented in Week 2+ as per the full architecture requirements.

---

## 🎯 Objectives

1. **Migrate CSV data** to PostgreSQL database
2. **Implement FastAPI backend** with CRUD operations
3. **Build React UI** with filtering, pagination, and sorting
4. **Integrate all three layers** for seamless data flow

---

## 📊 Data Model

### Source Data Structure

Based on `docs/Data/Clients_Control_Account_IT.csv`:

| Column | Description | Type | Notes |
|--------|-------------|------|-------|
| Serial Number | Client UUID | UUID | Primary key for client |
| File_Number | Sequential file number | Integer | Primary key for engagement |
| File_Number_As_Per | Formatted file number | String | Display format (e.g., "001SRIA") |
| Client_Name | Client business name | String | |
| PAN | Permanent Account Number | String | 10 characters, alphanumeric |
| Type | Engagement type | String | AOP (TRUST), FIRM, HUF, Individual, LLP, PRIVATE LTD., etc. |
| Type2 | Engagement sub-category | String | Trusts-Regd, Non-corporate-Audit, Individual-Audit, etc. |
| Senior | Senior staff member | String | Staff name |
| Assistant | Assistant staff member | String | Staff name |
| Status | Engagement status | String | Filed, Completed, Pending, etc. |

### Database Schema Design

#### Table: `clients`
```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number UUID UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    pan VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_pan ON clients(pan);
CREATE INDEX idx_clients_name ON clients(name);
```

#### Table: `engagements`
```sql
CREATE TABLE engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    file_number INTEGER NOT NULL,
    file_number_as_per VARCHAR(50) NOT NULL,
    type VARCHAR(100) NOT NULL,
    type2 VARCHAR(100),
    senior VARCHAR(100),
    assistant VARCHAR(100),
    status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(client_id, file_number)
);

CREATE INDEX idx_engagements_client_id ON engagements(client_id);
CREATE INDEX idx_engagements_status ON engagements(status);
CREATE INDEX idx_engagements_type ON engagements(type);
```

---

## 🗄️ Data Store Layer (PostgreSQL)

### Task 1.1: Database Setup

**Objective**: Set up PostgreSQL database and schema

**Requirements**:
1. Create PostgreSQL database: `ca_office_suite`
2. Create tables: `clients` and `engagements`
3. Create indexes for performance
4. Set up connection pooling

**Deliverables**:
- [ ] Database schema SQL script (`docs/database/schema.sql`)
- [ ] Migration script to load CSV data into database
- [ ] Database connection configuration

**Acceptance Criteria**:
- ✅ Database created and accessible
- ✅ All tables created with proper constraints
- ✅ CSV data successfully imported (40+ records)
- ✅ Foreign key relationships working
- ✅ Indexes created for query optimization

---

### Task 1.2: Data Migration

**Objective**: Migrate CSV data to PostgreSQL

**Requirements**:
1. Create Python script to read CSV file
2. Parse and validate data
3. Insert data into PostgreSQL tables
4. Handle duplicates and data validation

**Deliverables**:
- [ ] Migration script (`tools/migrations/import_clients_csv.py`)
- [ ] Data validation and error handling
- [ ] Migration log/report

**Acceptance Criteria**:
- ✅ All CSV records imported successfully
- ✅ Data integrity maintained (client-engagement relationships)
- ✅ Duplicate handling implemented
- ✅ Validation errors logged

---

## 🔌 API Middle-tier (Python FastAPI)

### Task 1.3: FastAPI Project Setup

**Objective**: Set up FastAPI project structure

**Requirements**:
1. Create FastAPI project structure
2. Set up database connection (SQLAlchemy/asyncpg)
3. Configure environment variables
4. Set up CORS for React frontend

**Project Structure**:
```
src/
└── api/
    ├── main.py                 # FastAPI app
    ├── config.py              # Configuration
    ├── database.py            # Database connection
    ├── models/                # SQLAlchemy models
    │   ├── client.py
    │   └── engagement.py
    ├── schemas/               # Pydantic schemas
    │   ├── client.py
    │   └── engagement.py
    ├── routers/               # API routes
    │   ├── clients.py
    │   └── engagements.py
    └── services/              # Business logic
        ├── client_service.py
        └── engagement_service.py
```

**Deliverables**:
- [ ] FastAPI project structure
- [ ] Database connection setup
- [ ] Environment configuration
- [ ] CORS configuration

**Acceptance Criteria**:
- ✅ FastAPI app runs successfully
- ✅ Database connection established
- ✅ CORS configured for React frontend
- ✅ Project structure follows best practices

---

### Task 1.4: Database Models

**Objective**: Create SQLAlchemy models

**Requirements**:
1. Create `Client` model
2. Create `Engagement` model
3. Define relationships (one-to-many: Client → Engagements)
4. Add timestamps and soft delete support

**Deliverables**:
- [ ] `models/client.py` - Client model
- [ ] `models/engagement.py` - Engagement model
- [ ] Model relationships defined

**Acceptance Criteria**:
- ✅ Models match database schema
- ✅ Relationships properly defined
- ✅ Timestamps auto-managed
- ✅ Models are testable

---

### Task 1.5: Pydantic Schemas

**Objective**: Create request/response schemas

**Requirements**:
1. Create schemas for Client (Create, Update, Response)
2. Create schemas for Engagement (Create, Update, Response)
3. Add validation rules (PAN format, required fields)
4. Create list response schemas with pagination

**Deliverables**:
- [ ] `schemas/client.py` - Client schemas
- [ ] `schemas/engagement.py` - Engagement schemas
- [ ] Validation rules implemented

**Acceptance Criteria**:
- ✅ All CRUD schemas defined
- ✅ Validation rules working
- ✅ PAN format validation
- ✅ Pagination schemas ready

---

### Task 1.6: CRUD Operations - Clients

**Objective**: Implement Client CRUD endpoints

**Requirements**:
1. **CREATE**: `POST /api/clients` - Create new client
2. **READ**: 
   - `GET /api/clients` - List all clients (with pagination, filtering, sorting)
   - `GET /api/clients/{id}` - Get client by ID
   - `GET /api/clients/{id}/engagements` - Get all engagements for a client
3. **UPDATE**: `PUT /api/clients/{id}` - Update client
4. **DELETE**: `DELETE /api/clients/{id}` - Delete client (cascade to engagements)

**Query Parameters for List Endpoint**:
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 10, max: 100)
- `search`: Search in name, PAN
- `sort_by`: Field to sort by (name, pan, created_at)
- `sort_order`: asc or desc (default: asc)

**Deliverables**:
- [ ] `routers/clients.py` - Client routes
- [ ] `services/client_service.py` - Business logic
- [ ] Error handling and validation

**Acceptance Criteria**:
- ✅ All CRUD operations working
- ✅ Pagination implemented
- ✅ Filtering by name/PAN working
- ✅ Sorting working
- ✅ Error handling proper
- ✅ Validation working

---

### Task 1.7: CRUD Operations - Engagements

**Objective**: Implement Engagement CRUD endpoints

**Requirements**:
1. **CREATE**: `POST /api/clients/{client_id}/engagements` - Create new engagement
2. **READ**: 
   - `GET /api/engagements` - List all engagements (with pagination, filtering, sorting)
   - `GET /api/engagements/{id}` - Get engagement by ID
3. **UPDATE**: `PUT /api/engagements/{id}` - Update engagement
4. **DELETE**: `DELETE /api/engagements/{id}` - Delete engagement

**Query Parameters for List Endpoint**:
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 10, max: 100)
- `client_id`: Filter by client ID
- `status`: Filter by status
- `type`: Filter by engagement type
- `senior`: Filter by senior staff
- `search`: Search in client name, file number
- `sort_by`: Field to sort by (file_number, status, type, created_at)
- `sort_order`: asc or desc (default: asc)

**Deliverables**:
- [ ] `routers/engagements.py` - Engagement routes
- [ ] `services/engagement_service.py` - Business logic
- [ ] Error handling and validation

**Acceptance Criteria**:
- ✅ All CRUD operations working
- ✅ Pagination implemented
- ✅ Multiple filters working (status, type, senior, client_id)
- ✅ Sorting working
- ✅ Error handling proper
- ✅ Client relationship validated

---

### Task 1.8: API Documentation

**Objective**: Set up API documentation

**Requirements**:
1. Configure Swagger UI (`/docs`)
2. Configure ReDoc (`/redoc`)
3. Add API descriptions and examples
4. Document error responses

**Deliverables**:
- [ ] Swagger UI accessible
- [ ] ReDoc accessible
- [ ] All endpoints documented
- [ ] Request/response examples

**Acceptance Criteria**:
- ✅ Swagger UI shows all endpoints
- ✅ All endpoints have descriptions
- ✅ Request/response examples provided
- ✅ Error responses documented

---

## 🎨 UI Layer (React + TypeScript)

### Task 1.9: Data Models & Types

**Objective**: Create TypeScript types matching API schemas

**Requirements**:
1. Update `types/index.ts` with Client and Engagement types
2. Create API response types
3. Create pagination types
4. Create filter/sort types

**Deliverables**:
- [ ] Updated `src/types/index.ts`
- [ ] API response types
- [ ] Pagination types
- [ ] Filter/sort types

**Acceptance Criteria**:
- ✅ Types match API schemas
- ✅ All types properly exported
- ✅ Types are reusable

---

### Task 1.10: API Service Layer

**Objective**: Create API service functions

**Requirements**:
1. Replace mock data with real API calls
2. Create client service functions (CRUD)
3. Create engagement service functions (CRUD)
4. Handle errors and loading states

**Deliverables**:
- [ ] Updated `services/api.ts`
- [ ] Client service functions
- [ ] Engagement service functions
- [ ] Error handling

**Acceptance Criteria**:
- ✅ All API calls implemented
- ✅ Error handling working
- ✅ Loading states managed
- ✅ TypeScript types used

---

### Task 1.11: Clients List Page

**Objective**: Build clients list page with CRUD operations

**Requirements**:
1. Display clients in DataGrid
2. **Filtering**: 
   - Search by name or PAN
   - Filter by status (if applicable)
3. **Pagination**: 
   - Page size selector (10, 25, 50, 100)
   - Page navigation
   - Show total count
4. **Sorting**: 
   - Sort by name, PAN, created date
   - Ascending/descending
5. **Actions**:
   - Create new client button
   - Edit client (inline or modal)
   - Delete client (with confirmation)
   - View client details

**Columns to Display**:
- Client Name (link to details)
- PAN
- Total Engagements (count)
- Created Date
- Actions (Edit, Delete)

**Deliverables**:
- [ ] Updated `pages/Clients.tsx`
- [ ] Client creation form/modal
- [ ] Client edit form/modal
- [ ] Delete confirmation dialog
- [ ] Filtering UI
- [ ] Pagination UI
- [ ] Sorting UI

**Acceptance Criteria**:
- ✅ All CRUD operations working
- ✅ Filtering working (name, PAN)
- ✅ Pagination working
- ✅ Sorting working
- ✅ DataGrid displays correctly
- ✅ Forms validated
- ✅ Error messages shown

---

### Task 1.12: Engagements List Page

**Objective**: Build engagements list page with CRUD operations

**Requirements**:
1. Display engagements in DataGrid
2. **Filtering**: 
   - Search by client name or file number
   - Filter by status
   - Filter by type
   - Filter by senior staff
   - Filter by client (dropdown)
3. **Pagination**: 
   - Page size selector (10, 25, 50, 100)
   - Page navigation
   - Show total count
4. **Sorting**: 
   - Sort by file number, status, type, client name, created date
   - Ascending/descending
5. **Actions**:
   - Create new engagement button
   - Edit engagement (inline or modal)
   - Delete engagement (with confirmation)
   - View engagement details

**Columns to Display**:
- File Number As Per
- Client Name (link to client)
- Type
- Type2
- Senior
- Assistant
- Status
- Created Date
- Actions (Edit, Delete)

**Deliverables**:
- [ ] New or updated `pages/Engagements.tsx`
- [ ] Engagement creation form/modal
- [ ] Engagement edit form/modal
- [ ] Delete confirmation dialog
- [ ] Advanced filtering UI
- [ ] Pagination UI
- [ ] Sorting UI

**Acceptance Criteria**:
- ✅ All CRUD operations working
- ✅ Multiple filters working (status, type, senior, client)
- ✅ Pagination working
- ✅ Sorting working
- ✅ DataGrid displays correctly
- ✅ Forms validated
- ✅ Client selection working
- ✅ Error messages shown

---

### Task 1.13: Client Detail Page

**Objective**: Build client detail page showing client info and engagements

**Requirements**:
1. Display client information
2. Display all engagements for the client in a table
3. Add new engagement from detail page
4. Edit/delete engagements from detail page
5. Link back to clients list

**Deliverables**:
- [ ] Client detail view component
- [ ] Engagements sub-table
- [ ] Quick actions (add engagement)

**Acceptance Criteria**:
- ✅ Client details displayed
- ✅ Engagements listed correctly
- ✅ Can add engagement from detail page
- ✅ Navigation working

---

### Task 1.14: Form Components

**Objective**: Create reusable form components

**Requirements**:
1. Client form component (Create/Edit)
2. Engagement form component (Create/Edit)
3. Form validation
4. Error display
5. Loading states

**Form Fields**:

**Client Form**:
- Name (required)
- PAN (required, format validation)
- Serial Number (auto-generated or manual)

**Engagement Form**:
- Client (dropdown, required)
- File Number (required, integer)
- File Number As Per (required)
- Type (dropdown, required)
- Type2 (dropdown, optional)
- Senior (dropdown or text, optional)
- Assistant (dropdown or text, optional)
- Status (dropdown, required)

**Deliverables**:
- [ ] `components/forms/ClientForm.tsx`
- [ ] `components/forms/EngagementForm.tsx`
- [ ] Form validation
- [ ] Error handling

**Acceptance Criteria**:
- ✅ Forms are reusable
- ✅ Validation working
- ✅ Error messages clear
- ✅ Loading states handled

---

## 🔗 Integration & Testing

### Task 1.15: End-to-End Integration

**Objective**: Integrate all three layers

**Requirements**:
1. Connect React UI to FastAPI backend
2. Test all CRUD operations end-to-end
3. Test filtering, pagination, sorting
4. Handle errors gracefully
5. Test data flow

**Deliverables**:
- [ ] All layers integrated
- [ ] End-to-end testing completed
- [ ] Error handling verified

**Acceptance Criteria**:
- ✅ UI connects to API
- ✅ API connects to database
- ✅ All CRUD operations work end-to-end
- ✅ Filtering, pagination, sorting work
- ✅ Errors handled gracefully

---

### Task 1.16: Error Handling

**Objective**: Implement comprehensive error handling

**Requirements**:
1. API error responses (400, 404, 500)
2. UI error display
3. Network error handling
4. Validation error display
5. User-friendly error messages

**Deliverables**:
- [ ] Error handling in API
- [ ] Error handling in UI
- [ ] Error messages user-friendly

**Acceptance Criteria**:
- ✅ All errors handled
- ✅ Error messages clear
- ✅ User experience good

---

## 📝 Documentation

### Task 1.17: API Documentation

**Objective**: Document API endpoints

**Requirements**:
1. Document all endpoints
2. Document request/response formats
3. Document error responses
4. Provide examples

**Deliverables**:
- [ ] API documentation (Swagger/ReDoc)
- [ ] README for API setup
- [ ] Example requests/responses

---

### Task 1.18: UI Documentation

**Objective**: Document UI components and usage

**Requirements**:
1. Document new components
2. Document API integration
3. Update README

**Deliverables**:
- [ ] Component documentation
- [ ] Updated README
- [ ] Usage examples

---

## ✅ Acceptance Criteria Summary

### Database Layer
- [ ] PostgreSQL database set up
- [ ] Tables created with proper schema
- [ ] CSV data migrated successfully
- [ ] Indexes created for performance

### API Layer
- [ ] FastAPI project set up
- [ ] All CRUD endpoints implemented
- [ ] Pagination working
- [ ] Filtering working
- [ ] Sorting working
- [ ] Error handling implemented
- [ ] API documentation available

### UI Layer
- [ ] Clients list page with CRUD
- [ ] Engagements list page with CRUD
- [ ] Filtering UI implemented
- [ ] Pagination UI implemented
- [ ] Sorting UI implemented
- [ ] Forms for create/edit
- [ ] Error handling in UI
- [ ] Loading states handled

### Integration
- [ ] All layers integrated
- [ ] End-to-end testing passed
- [ ] Error handling working
- [ ] Performance acceptable

---

## 🚀 Getting Started

### Prerequisites
- PostgreSQL 14+ installed and running
- Python 3.10+ installed
- Node.js 18+ installed
- React frontend already set up

### Setup Steps
1. **Database**: Run schema SQL script
2. **Database**: Run migration script to import CSV
3. **API**: Set up Python virtual environment
4. **API**: Install dependencies (`pip install -r requirements.txt`)
5. **API**: Configure environment variables
6. **API**: Run FastAPI server
7. **UI**: Update API service to point to FastAPI
8. **UI**: Test integration

---

## 📊 Success Metrics

- ✅ All CRUD operations functional
- ✅ Filtering returns correct results
- ✅ Pagination works correctly
- ✅ Sorting works correctly
- ✅ Data integrity maintained
- ✅ **Performance**: API response time < 500ms (p95) - aligns with `docs/01_Requirements.md`
- ✅ **Performance**: Page load time < 2 seconds - aligns with `docs/01_Requirements.md`
- ✅ Error handling comprehensive
- ✅ User experience smooth

---

## 🔄 Next Steps (Week 2+)

After Week 1 completion, the following will be added to align with full architecture (`docs/02_Architecture.md`):

### Architecture Integration
- **.NET Aspire BFF Integration**: Host React frontend in BFF
- **API Gateway**: Add API Gateway layer for service orchestration
- **Service Discovery**: Implement service discovery via Aspire

### Security & Authentication
- **Authentication/Authorization**: JWT tokens, OAuth 2.0, RBAC (as per `docs/01_Requirements.md`)
- **Enhanced Security**: Data encryption at rest and in transit
- **Audit Logging**: Comprehensive audit trails for all operations

### Performance & Scalability
- **Redis Caching**: Implement caching layer for performance (cache-aside pattern)
- **Performance Optimization**: Query optimization, connection pooling
- **Horizontal Scaling**: Prepare for stateless service scaling

### Additional Features
- Advanced search functionality
- Bulk operations
- Export to Excel/CSV
- Dashboard with statistics
- Advanced reporting
- Document management integration

---

**Task Owner**: Development Team  
**Estimated Duration**: 1 Week  
**Dependencies**: None  
**Blockers**: None

