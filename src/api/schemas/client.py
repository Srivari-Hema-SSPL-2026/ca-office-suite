"""
Client Pydantic Schemas
Defines request/response models for client endpoints
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ============================================================================
# Base Schemas
# ============================================================================

class ClientBase(BaseModel):
    """Base client schema with common fields."""
    name: str = Field(..., min_length=1, max_length=255, description="Client legal name")
    pan: str = Field(..., pattern=r"^[A-Z]{5}[0-9]{4}[A-Z]$", description="PAN number (format: XXXXX9999X)")
    email: Optional[str] = Field(None, max_length=255, description="Client email address")
    phone: Optional[str] = Field(None, max_length=20, description="Client phone number")
    address: Optional[str] = Field(None, description="Client address")
    status: str = Field(default="active", pattern=r"^(active|inactive)$", description="Client status")


# ============================================================================
# Request Schemas
# ============================================================================

class ClientCreate(ClientBase):
    """Schema for creating a new client."""
    pass


class ClientUpdate(BaseModel):
    """Schema for updating a client (all fields optional)."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    pan: Optional[str] = Field(None, pattern=r"^[A-Z]{5}[0-9]{4}[A-Z]$")
    email: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None
    status: Optional[str] = Field(None, pattern=r"^(active|inactive)$")


# ============================================================================
# Response Schemas
# ============================================================================

class ClientRead(ClientBase):
    """Schema for reading client data."""
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class ClientWithEngagements(ClientRead):
    """Schema for client with engagement count."""
    engagement_count: int = Field(0, description="Number of engagements for this client")


# ============================================================================
# Pagination Schema
# ============================================================================

class PaginatedClients(BaseModel):
    """Paginated list of clients."""
    items: List[ClientRead]
    total: int = Field(..., description="Total number of items")
    page: int = Field(..., description="Current page number")
    page_size: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")
    
    model_config = ConfigDict(from_attributes=True)
