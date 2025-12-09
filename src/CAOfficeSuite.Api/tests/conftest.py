"""
Pytest configuration and fixtures for FastAPI tests
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app
from database import get_db, Base

# Test database URL (in-memory SQLite for testing)
TEST_DATABASE_URL = "sqlite:///:memory:"

# Create test engine
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Create test session
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Create a fresh database session for each test."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client with database dependency override."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_client_data():
    """Sample client data for testing."""
    return {
        "name": "Test Client",
        "pan": "ABCDE1234F",
        "email": "test@example.com",
        "phone": "1234567890",
        "address": "123 Test Street",
        "status": "active"
    }


@pytest.fixture
def sample_engagement_data():
    """Sample engagement data for testing."""
    return {
        "file_number": 1001,
        "file_number_as_per": "IT-2024-001",
        "type": "ITR",
        "type2": "Individual",
        "senior": "Senior CA",
        "assistant": "Assistant Name",
        "status": "active"
    }

