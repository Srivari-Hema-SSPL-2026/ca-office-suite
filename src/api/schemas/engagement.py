"""
Engagement Pydantic Schemas
Defines request/response models for engagement endpoints
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ============================================================================
# Base Schemas
# ============================================================================

class EngagementBase(BaseModel):
    """Base engagement schema with common fields."""
    client_id: UUID = Field(..., description="Client UUID")
    file_number: int = Field(..., ge=1, description="File number (positive integer)")
    file_number_as_per: Optional[str] = Field(None, max_length=50, description="File number reference code")
    type: str = Field(..., min_length=1, max_length=100, description="Engagement type")
    type2: Optional[str] = Field(None, max_length=100, description="Engagement sub-type")
    senior: Optional[str] = Field(None, max_length=100, description="Senior staff assigned")
    assistant: Optional[str] = Field(None, max_length=100, description="Assistant staff assigned")
    status: str = Field(..., min_length=1, max_length=100, description="Engagement status")


# ============================================================================
# Request Schemas
# ============================================================================

class EngagementCreate(EngagementBase):
    """Schema for creating a new engagement."""
    pass


class EngagementUpdate(BaseModel):
    """Schema for updating an engagement (all fields optional except IDs)."""
    file_number: Optional[int] = Field(None, ge=1)
    file_number_as_per: Optional[str] = Field(None, max_length=50)
    type: Optional[str] = Field(None, min_length=1, max_length=100)
    type2: Optional[str] = Field(None, max_length=100)
    senior: Optional[str] = Field(None, max_length=100)
    assistant: Optional[str] = Field(None, max_length=100)
    status: Optional[str] = Field(None, min_length=1, max_length=100)


# ============================================================================
# Response Schemas
# ============================================================================

class EngagementRead(EngagementBase):
    """Schema for reading engagement data."""
    id: UUID
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class EngagementWithClient(EngagementRead):
    """Schema for engagement with client details."""
    client_name: str = Field(..., description="Client name")
    client_pan: str = Field(..., description="Client PAN")
    
    model_config = ConfigDict(from_attributes=True)


# ============================================================================
# Pagination Schema
# ============================================================================

class PaginatedEngagements(BaseModel):
    """Paginated list of engagements."""
    items: List[EngagementRead]
    total: int = Field(..., description="Total number of items")
    page: int = Field(..., description="Current page number")
    page_size: int = Field(..., description="Number of items per page")
    total_pages: int = Field(..., description="Total number of pages")
    
    model_config = ConfigDict(from_attributes=True)
