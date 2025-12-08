"""Schemas package initialization."""

from .client import (
    ClientCreate,
    ClientUpdate,
    ClientRead,
    ClientWithEngagements,
    PaginatedClients
)
from .engagement import (
    EngagementCreate,
    EngagementUpdate,
    EngagementRead,
    EngagementWithClient,
    PaginatedEngagements
)

__all__ = [
    "ClientCreate",
    "ClientUpdate",
    "ClientRead",
    "ClientWithEngagements",
    "PaginatedClients",
    "EngagementCreate",
    "EngagementUpdate",
    "EngagementRead",
    "EngagementWithClient",
    "PaginatedEngagements",
]
