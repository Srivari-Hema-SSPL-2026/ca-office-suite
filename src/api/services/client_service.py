"""
Client Service
Business logic for client operations
"""

from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from typing import Optional, List, Tuple
from uuid import UUID
import math

from ..models.client import Client
from ..models.engagement import Engagement
from ..schemas.client import ClientCreate, ClientUpdate


class ClientService:
    """Service class for client-related operations."""
    
    @staticmethod
    def get_clients(
        db: Session,
        page: int = 1,
        page_size: int = 50,
        search: Optional[str] = None,
        status: Optional[str] = None,
        sort_by: str = "name",
        sort_order: str = "asc"
    ) -> Tuple[List[Client], int]:
        """
        Get paginated list of clients with optional filtering and sorting.
        
        Returns: (clients_list, total_count)
        """
        query = db.query(Client)
        
        # Apply search filter
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Client.name.ilike(search_pattern),
                    Client.pan.ilike(search_pattern),
                    Client.email.ilike(search_pattern)
                )
            )
        
        # Apply status filter
        if status:
            query = query.filter(Client.status == status)
        
        # Get total count before pagination
        total = query.count()
        
        # Apply sorting
        if sort_order.lower() == "desc":
            query = query.order_by(getattr(Client, sort_by).desc())
        else:
            query = query.order_by(getattr(Client, sort_by).asc())
        
        # Apply pagination
        offset = (page - 1) * page_size
        clients = query.offset(offset).limit(page_size).all()
        
        return clients, total
    
    @staticmethod
    def get_client_by_id(db: Session, client_id: UUID) -> Optional[Client]:
        """Get a single client by ID."""
        return db.query(Client).filter(Client.id == client_id).first()
    
    @staticmethod
    def create_client(db: Session, client_data: ClientCreate) -> Client:
        """Create a new client."""
        client = Client(**client_data.model_dump())
        db.add(client)
        db.commit()
        db.refresh(client)
        return client
    
    @staticmethod
    def update_client(
        db: Session,
        client_id: UUID,
        client_data: ClientUpdate
    ) -> Optional[Client]:
        """Update an existing client."""
        client = db.query(Client).filter(Client.id == client_id).first()
        
        if not client:
            return None
        
        # Update only provided fields
        update_data = client_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(client, field, value)
        
        db.commit()
        db.refresh(client)
        return client
    
    @staticmethod
    def delete_client(db: Session, client_id: UUID) -> bool:
        """Delete a client (cascades to engagements)."""
        client = db.query(Client).filter(Client.id == client_id).first()
        
        if not client:
            return False
        
        db.delete(client)
        db.commit()
        return True
    
    @staticmethod
    def get_client_engagements(
        db: Session,
        client_id: UUID,
        page: int = 1,
        page_size: int = 50
    ) -> Tuple[List[Engagement], int]:
        """Get paginated engagements for a specific client."""
        query = db.query(Engagement).filter(Engagement.client_id == client_id)
        
        total = query.count()
        
        offset = (page - 1) * page_size
        engagements = query.order_by(Engagement.file_number.asc()).offset(offset).limit(page_size).all()
        
        return engagements, total
