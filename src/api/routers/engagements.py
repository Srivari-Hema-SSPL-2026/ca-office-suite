"""
Engagement API Router
Endpoints for engagement CRUD operations
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
import math

from ..database import get_db
from ..services.engagement_service import EngagementService
from ..schemas.engagement import (
    EngagementCreate,
    EngagementUpdate,
    EngagementRead,
    PaginatedEngagements
)
from ..config import get_settings

router = APIRouter(prefix="/engagements", tags=["engagements"])
settings = get_settings()


@router.get("", response_model=PaginatedEngagements)
def list_engagements(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(settings.default_page_size, ge=1, le=settings.max_page_size, description="Items per page"),
    client_id: Optional[UUID] = Query(None, description="Filter by client ID"),
    status: Optional[str] = Query(None, description="Filter by status"),
    type: Optional[str] = Query(None, description="Filter by engagement type"),
    senior: Optional[str] = Query(None, description="Filter by senior staff name"),
    sort_by: str = Query("file_number", description="Sort by field"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Sort order"),
    db: Session = Depends(get_db)
):
    """
    Get paginated list of engagements with optional filtering and sorting.
    
    Query Parameters:
    - **page**: Page number (default: 1)
    - **page_size**: Items per page (default: 50, max: 100)
    - **client_id**: Filter by client UUID
    - **status**: Filter by engagement status
    - **type**: Filter by engagement type
    - **senior**: Filter by senior staff name (partial match)
    - **sort_by**: Field to sort by (default: file_number)
    - **sort_order**: Sort order - asc or desc (default: asc)
    """
    engagements, total = EngagementService.get_engagements(
        db=db,
        page=page,
        page_size=page_size,
        client_id=client_id,
        status=status,
        type=type,
        senior=senior,
        sort_by=sort_by,
        sort_order=sort_order
    )
    
    total_pages = math.ceil(total / page_size) if total > 0 else 0
    
    return PaginatedEngagements(
        items=engagements,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/{engagement_id}", response_model=EngagementRead)
def get_engagement(
    engagement_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Get a single engagement by ID.
    
    Path Parameters:
    - **engagement_id**: UUID of the engagement
    """
    engagement = EngagementService.get_engagement_by_id(db, engagement_id)
    
    if not engagement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Engagement with id {engagement_id} not found"
        )
    
    return engagement


@router.post("", response_model=EngagementRead, status_code=status.HTTP_201_CREATED)
def create_engagement(
    engagement_data: EngagementCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new engagement.
    
    Request Body:
    - **client_id**: Client UUID (required)
    - **file_number**: File number - positive integer (required)
    - **file_number_as_per**: File number reference code (optional)
    - **type**: Engagement type (required)
    - **type2**: Engagement sub-type (optional)
    - **senior**: Senior staff assigned (optional)
    - **assistant**: Assistant staff assigned (optional)
    - **status**: Engagement status (required)
    """
    try:
        engagement = EngagementService.create_engagement(db, engagement_data)
        return engagement
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create engagement: {str(e)}"
        )


@router.put("/{engagement_id}", response_model=EngagementRead)
def update_engagement(
    engagement_id: UUID,
    engagement_data: EngagementUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing engagement.
    
    Path Parameters:
    - **engagement_id**: UUID of the engagement
    
    Request Body: All fields are optional
    - **file_number**: File number - positive integer
    - **file_number_as_per**: File number reference code
    - **type**: Engagement type
    - **type2**: Engagement sub-type
    - **senior**: Senior staff assigned
    - **assistant**: Assistant staff assigned
    - **status**: Engagement status
    """
    engagement = EngagementService.update_engagement(db, engagement_id, engagement_data)
    
    if not engagement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Engagement with id {engagement_id} not found"
        )
    
    return engagement


@router.delete("/{engagement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_engagement(
    engagement_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Delete an engagement.
    
    Path Parameters:
    - **engagement_id**: UUID of the engagement
    """
    success = EngagementService.delete_engagement(db, engagement_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Engagement with id {engagement_id} not found"
        )
    
    return None
