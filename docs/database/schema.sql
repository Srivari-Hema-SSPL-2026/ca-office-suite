-- CA Office Suite Database Schema
-- Version: 1.0
-- Created: December 8, 2025
-- Description: PostgreSQL schema for Client Control & Engagement Management

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS engagements CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

-- ============================================================================
-- Clients Table
-- ============================================================================
-- Stores client master data with unique identifiers and contact information
CREATE TABLE clients (
    id UUID PRIMARY KEY,                    -- Client UUID (from CSV Serial Number)
    name VARCHAR(255) NOT NULL,             -- Client legal name
    pan VARCHAR(10) NOT NULL,               -- Permanent Account Number (10 chars)
    email VARCHAR(255),                     -- Client email address
    phone VARCHAR(20),                      -- Client phone number
    address TEXT,                           -- Client address
    status VARCHAR(20) DEFAULT 'active',    -- Client status (active/inactive)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT clients_pan_format CHECK (pan ~ '^[A-Z]{5}[0-9]{4}[A-Z]$'),
    CONSTRAINT clients_status_check CHECK (status IN ('active', 'inactive'))
);

-- ============================================================================
-- Engagements Table
-- ============================================================================
-- Stores engagement/file information linked to clients
-- Each client can have multiple engagements for different services/years
CREATE TABLE engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Engagement unique ID
    client_id UUID NOT NULL,                        -- Foreign key to clients
    file_number INTEGER NOT NULL,                   -- Sequential file number
    file_number_as_per VARCHAR(50),                 -- File number reference code
    type VARCHAR(100) NOT NULL,                     -- Engagement type (e.g., "FIRM", "HUF")
    type2 VARCHAR(100),                             -- Engagement sub-type (e.g., "Individual-Audit")
    senior VARCHAR(100),                            -- Senior staff assigned
    assistant VARCHAR(100),                         -- Assistant staff assigned
    status VARCHAR(100) NOT NULL,                   -- Engagement status
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_engagement_client 
        FOREIGN KEY (client_id) 
        REFERENCES clients(id) 
        ON DELETE CASCADE,
    
    -- Unique constraint: one file_number per client
    CONSTRAINT unique_client_file_number UNIQUE (client_id, file_number)
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

-- Clients table indexes
CREATE INDEX idx_clients_pan ON clients(pan);
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_status ON clients(status);

-- Engagements table indexes
CREATE INDEX idx_engagements_client_id ON engagements(client_id);
CREATE INDEX idx_engagements_status ON engagements(status);
CREATE INDEX idx_engagements_type ON engagements(type);
CREATE INDEX idx_engagements_senior ON engagements(senior);
CREATE INDEX idx_engagements_file_number ON engagements(file_number);

-- ============================================================================
-- Triggers for Updated At Timestamp
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for clients table
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for engagements table
CREATE TRIGGER update_engagements_updated_at 
    BEFORE UPDATE ON engagements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Sample Queries for Verification
-- ============================================================================

-- Count clients
-- SELECT COUNT(*) FROM clients;

-- Count engagements
-- SELECT COUNT(*) FROM engagements;

-- Get client with their engagements
-- SELECT c.name, c.pan, e.file_number, e.type, e.status
-- FROM clients c
-- LEFT JOIN engagements e ON c.id = e.client_id
-- WHERE c.id = 'client-uuid-here';

-- Get engagements by status
-- SELECT status, COUNT(*) 
-- FROM engagements 
-- GROUP BY status 
-- ORDER BY COUNT(*) DESC;

-- ============================================================================
-- Notes
-- ============================================================================
-- 1. The 'id' in clients table should match the 'Serial Number' from CSV
-- 2. All timestamps are stored with timezone for consistency
-- 3. PAN format is validated: 5 letters + 4 digits + 1 letter
-- 4. Cascading delete ensures data integrity (deleting client removes engagements)
-- 5. Indexes are created on commonly queried fields for performance
