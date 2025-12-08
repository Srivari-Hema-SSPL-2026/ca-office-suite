"""
Engagement Service
Business logic for engagement operations
"""

from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List, Tuple
from uuid import UUID

from ..models.engagement import Engagement
from ..schemas.engagement import EngagementCreate, EngagementUpdate


class EngagementService:
    """Service class for engagement-related operations."""
    
    @staticmethod
    def get_engagements(
        db: Session,
        page: int = 1,
        page_size: int = 50,
        client_id: Optional[UUID] = None,
        status: Optional[str] = None,
        type: Optional[str] = None,
        senior: Optional[str] = None,
        sort_by: str = "file_number",
        sort_order: str = "asc"
    ) -> Tuple[List[Engagement], int]:
        """
        Get paginated list of engagements with optional filtering and sorting.
        
        Returns: (engagements_list, total_count)
        """
        query = db.query(Engagement)
        
        # Apply filters
        if client_id:
            query = query.filter(Engagement.client_id == client_id)
        
        if status:
            query = query.filter(Engagement.status == status)
        
        if type:
            query = query.filter(Engagement.type == type)
        
        if senior:
            query = query.filter(Engagement.senior.ilike(f"%{senior}%"))
        
        # Get total count before pagination
        total = query.count()
        
        # Apply sorting
        if sort_order.lower() == "desc":
            query = query.order_by(getattr(Engagement, sort_by).desc())
        else:
            query = query.order_by(getattr(Engagement, sort_by).asc())
        
        # Apply pagination
        offset = (page - 1) * page_size
        engagements = query.offset(offset).limit(page_size).all()
        
        return engagements, total
    
    @staticmethod
    def get_engagement_by_id(db: Session, engagement_id: UUID) -> Optional[Engagement]:
        """Get a single engagement by ID."""
        return db.query(Engagement).filter(Engagement.id == engagement_id).first()
    
    @staticmethod
    def create_engagement(db: Session, engagement_data: EngagementCreate) -> Engagement:
        """Create a new engagement."""
        engagement = Engagement(**engagement_data.model_dump())
        db.add(engagement)
        db.commit()
        db.refresh(engagement)
        return engagement
    
    @staticmethod
    def update_engagement(
        db: Session,
        engagement_id: UUID,
        engagement_data: EngagementUpdate
    ) -> Optional[Engagement]:
        """Update an existing engagement."""
        engagement = db.query(Engagement).filter(Engagement.id == engagement_id).first()
        
        if not engagement:
            return None
        
        # Update only provided fields
        update_data = engagement_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(engagement, field, value)
        
        db.commit()
        db.refresh(engagement)
        return engagement
    
    @staticmethod
    def delete_engagement(db: Session, engagement_id: UUID) -> bool:
        """Delete an engagement."""
        engagement = db.query(Engagement).filter(Engagement.id == engagement_id).first()
        
        if not engagement:
            return False
        
        db.delete(engagement)
        db.commit()
        return True
