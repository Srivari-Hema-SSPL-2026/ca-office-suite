"""
Tests for engagement API endpoints
"""
import pytest
from fastapi import status


def test_create_engagement(client, db_session, sample_client_data, sample_engagement_data):
    """Test creating a new engagement."""
    # First create a client
    client_response = client.post("/api/v1/clients", json=sample_client_data)
    assert client_response.status_code == status.HTTP_201_CREATED
    client_id = client_response.json()["id"]

    # Create engagement
    engagement_data = {**sample_engagement_data, "client_id": client_id}
    response = client.post("/api/v1/engagements", json=engagement_data)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["file_number"] == sample_engagement_data["file_number"]
    assert data["client_id"] == client_id
    assert "id" in data
    assert "created_at" in data


def test_get_engagements_empty(client):
    """Test getting engagements when database is empty."""
    response = client.get("/api/v1/engagements")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []


def test_get_engagement_by_id(client, db_session, sample_client_data, sample_engagement_data):
    """Test getting an engagement by ID."""
    # Create client and engagement
    client_response = client.post("/api/v1/clients", json=sample_client_data)
    client_id = client_response.json()["id"]
    
    engagement_data = {**sample_engagement_data, "client_id": client_id}
    create_response = client.post("/api/v1/engagements", json=engagement_data)
    engagement_id = create_response.json()["id"]

    # Get engagement by ID
    response = client.get(f"/api/v1/engagements/{engagement_id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == engagement_id
    assert data["file_number"] == sample_engagement_data["file_number"]


def test_update_engagement(client, db_session, sample_client_data, sample_engagement_data):
    """Test updating an engagement."""
    # Create client and engagement
    client_response = client.post("/api/v1/clients", json=sample_client_data)
    client_id = client_response.json()["id"]
    
    engagement_data = {**sample_engagement_data, "client_id": client_id}
    create_response = client.post("/api/v1/engagements", json=engagement_data)
    engagement_id = create_response.json()["id"]

    # Update engagement
    update_data = {**engagement_data, "type": "GST"}
    response = client.put(f"/api/v1/engagements/{engagement_id}", json=update_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["type"] == "GST"


def test_delete_engagement(client, db_session, sample_client_data, sample_engagement_data):
    """Test deleting an engagement."""
    # Create client and engagement
    client_response = client.post("/api/v1/clients", json=sample_client_data)
    client_id = client_response.json()["id"]
    
    engagement_data = {**sample_engagement_data, "client_id": client_id}
    create_response = client.post("/api/v1/engagements", json=engagement_data)
    engagement_id = create_response.json()["id"]

    # Delete engagement
    response = client.delete(f"/api/v1/engagements/{engagement_id}")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify engagement is deleted
    get_response = client.get(f"/api/v1/engagements/{engagement_id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND

