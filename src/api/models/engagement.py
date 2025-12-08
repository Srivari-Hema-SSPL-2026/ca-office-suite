"""
Engagement SQLAlchemy Model
Represents the engagements table in the database
"""

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from ..database import Base


class Engagement(Base):
    """Engagement database model."""
    
    __tablename__ = "engagements"
    
    # Columns
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey('clients.id', ondelete='CASCADE'), nullable=False, index=True)
    file_number = Column(Integer, nullable=False, index=True)
    file_number_as_per = Column(String(50), nullable=True)
    type = Column(String(100), nullable=False, index=True)
    type2 = Column(String(100), nullable=True)
    senior = Column(String(100), nullable=True, index=True)
    assistant = Column(String(100), nullable=True)
    status = Column(String(100), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # Relationships
    client = relationship("Client", back_populates="engagements")
    
    # Constraints
    __table_args__ = (
        UniqueConstraint('client_id', 'file_number', name='unique_client_file_number'),
    )
    
    def __repr__(self):
        return f"<Engagement(id={self.id}, client_id={self.client_id}, file_number={self.file_number}, type={self.type})>"
