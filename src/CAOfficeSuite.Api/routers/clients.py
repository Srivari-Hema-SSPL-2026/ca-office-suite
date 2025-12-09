"""
Client API Router
Endpoints for client CRUD operations
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
import math

from ..database import get_db
from ..services.client_service import ClientService
from ..schemas.client import (
    ClientCreate,
    ClientUpdate,
    ClientRead,
    PaginatedClients
)
from ..schemas.engagement import EngagementRead, PaginatedEngagements
from ..config import get_settings

router = APIRouter(prefix="/clients", tags=["clients"])
settings = get_settings()


@router.get("", response_model=PaginatedClients)
def list_clients(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(settings.default_page_size, ge=1, le=settings.max_page_size, description="Items per page"),
    search: Optional[str] = Query(None, description="Search in name, PAN, or email"),
    status: Optional[str] = Query(None, description="Filter by status (active/inactive)"),
    sort_by: str = Query("name", description="Sort by field"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Sort order"),
    db: Session = Depends(get_db)
):
    """
    Get paginated list of clients with optional filtering and sorting.
    
    Query Parameters:
    - **page**: Page number (default: 1)
    - **page_size**: Items per page (default: 50, max: 100)
    - **search**: Search text for name, PAN, or email
    - **status**: Filter by status (active/inactive)
    - **sort_by**: Field to sort by (default: name)
    - **sort_order**: Sort order - asc or desc (default: asc)
    """
    clients, total = ClientService.get_clients(
        db=db,
        page=page,
        page_size=page_size,
        search=search,
        status=status,
        sort_by=sort_by,
        sort_order=sort_order
    )
    
    total_pages = math.ceil(total / page_size) if total > 0 else 0
    
    return PaginatedClients(
        items=clients,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/{client_id}", response_model=ClientRead)
def get_client(
    client_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Get a single client by ID.
    
    Path Parameters:
    - **client_id**: UUID of the client
    """
    client = ClientService.get_client_by_id(db, client_id)
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Client with id {client_id} not found"
        )
    
    return client


@router.post("", response_model=ClientRead, status_code=status.HTTP_201_CREATED)
def create_client(
    client_data: ClientCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new client.
    
    Request Body:
    - **name**: Client legal name (required)
    - **pan**: PAN number in format XXXXX9999X (required)
    - **email**: Client email address (optional)
    - **phone**: Client phone number (optional)
    - **address**: Client address (optional)
    - **status**: Client status - active or inactive (default: active)
    """
    try:
        client = ClientService.create_client(db, client_data)
        return client
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create client: {str(e)}"
        )


@router.put("/{client_id}", response_model=ClientRead)
def update_client(
    client_id: UUID,
    client_data: ClientUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing client.
    
    Path Parameters:
    - **client_id**: UUID of the client
    
    Request Body: All fields are optional
    - **name**: Client legal name
    - **pan**: PAN number in format XXXXX9999X
    - **email**: Client email address
    - **phone**: Client phone number
    - **address**: Client address
    - **status**: Client status - active or inactive
    """
    client = ClientService.update_client(db, client_id, client_data)
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Client with id {client_id} not found"
        )
    
    return client


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(
    client_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Delete a client (cascades to engagements).
    
    Path Parameters:
    - **client_id**: UUID of the client
    """
    success = ClientService.delete_client(db, client_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Client with id {client_id} not found"
        )
    
    return None


@router.get("/{client_id}/engagements", response_model=PaginatedEngagements)
def get_client_engagements(
    client_id: UUID,
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(settings.default_page_size, ge=1, le=settings.max_page_size, description="Items per page"),
    db: Session = Depends(get_db)
):
    """
    Get all engagements for a specific client.
    
    Path Parameters:
    - **client_id**: UUID of the client
    
    Query Parameters:
    - **page**: Page number (default: 1)
    - **page_size**: Items per page (default: 50, max: 100)
    """
    # Check if client exists
    client = ClientService.get_client_by_id(db, client_id)
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Client with id {client_id} not found"
        )
    
    engagements, total = ClientService.get_client_engagements(
        db=db,
        client_id=client_id,
        page=page,
        page_size=page_size
    )
    
    total_pages = math.ceil(total / page_size) if total > 0 else 0
    
    return PaginatedEngagements(
        items=engagements,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )
