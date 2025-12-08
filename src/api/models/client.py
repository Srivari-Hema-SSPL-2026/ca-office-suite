"""
Client SQLAlchemy Model
Represents the clients table in the database
"""

from sqlalchemy import Column, String, DateTime, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from ..database import Base


class Client(Base):
    """Client database model."""
    
    __tablename__ = "clients"
    
    # Columns
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, index=True)
    pan = Column(String(10), nullable=False, index=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(String, nullable=True)
    status = Column(String(20), nullable=False, default='active', index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    engagements = relationship("Engagement", back_populates="client", cascade="all, delete-orphan")
    
    # Constraints
    __table_args__ = (
        CheckConstraint("status IN ('active', 'inactive')", name='clients_status_check'),
    )
    
    def __repr__(self):
        return f"<Client(id={self.id}, name={self.name}, pan={self.pan})>"
