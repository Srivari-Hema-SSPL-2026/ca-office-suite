"""
Tests for client API endpoints
"""
import pytest
from fastapi import status


def test_create_client(client, sample_client_data):
    """Test creating a new client."""
    response = client.post("/api/v1/clients", json=sample_client_data)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == sample_client_data["name"]
    assert data["pan"] == sample_client_data["pan"]
    assert "id" in data
    assert "created_at" in data


def test_create_client_invalid_pan(client, sample_client_data):
    """Test creating a client with invalid PAN format."""
    sample_client_data["pan"] = "INVALID"
    response = client.post("/api/v1/clients", json=sample_client_data)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_get_clients_empty(client):
    """Test getting clients when database is empty."""
    response = client.get("/api/v1/clients")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []


def test_get_clients_with_data(client, sample_client_data):
    """Test getting clients with data."""
    # Create a client
    create_response = client.post("/api/v1/clients", json=sample_client_data)
    assert create_response.status_code == status.HTTP_201_CREATED
    created_client = create_response.json()

    # Get all clients
    response = client.get("/api/v1/clients")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["id"] == created_client["id"]


def test_get_client_by_id(client, sample_client_data):
    """Test getting a client by ID."""
    # Create a client
    create_response = client.post("/api/v1/clients", json=sample_client_data)
    assert create_response.status_code == status.HTTP_201_CREATED
    created_client = create_response.json()
    client_id = created_client["id"]

    # Get client by ID
    response = client.get(f"/api/v1/clients/{client_id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == client_id
    assert data["name"] == sample_client_data["name"]


def test_get_client_not_found(client):
    """Test getting a non-existent client."""
    response = client.get("/api/v1/clients/00000000-0000-0000-0000-000000000000")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_update_client(client, sample_client_data):
    """Test updating a client."""
    # Create a client
    create_response = client.post("/api/v1/clients", json=sample_client_data)
    assert create_response.status_code == status.HTTP_201_CREATED
    created_client = create_response.json()
    client_id = created_client["id"]

    # Update client
    update_data = {**sample_client_data, "name": "Updated Client Name"}
    response = client.put(f"/api/v1/clients/{client_id}", json=update_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["name"] == "Updated Client Name"
    assert data["id"] == client_id


def test_delete_client(client, sample_client_data):
    """Test deleting a client."""
    # Create a client
    create_response = client.post("/api/v1/clients", json=sample_client_data)
    assert create_response.status_code == status.HTTP_201_CREATED
    created_client = create_response.json()
    client_id = created_client["id"]

    # Delete client
    response = client.delete(f"/api/v1/clients/{client_id}")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify client is deleted
    get_response = client.get(f"/api/v1/clients/{client_id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND


def test_get_clients_pagination(client, sample_client_data):
    """Test pagination for clients."""
    # Create multiple clients
    for i in range(5):
        client_data = {**sample_client_data, "name": f"Client {i}", "pan": f"ABCDE123{i}F"}
        client.post("/api/v1/clients", json=client_data)

    # Get first page
    response = client.get("/api/v1/clients?page=1&page_size=2")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 5
    assert len(data["items"]) == 2
    assert data["page"] == 1
    assert data["page_size"] == 2


def test_get_clients_filtering(client, sample_client_data):
    """Test filtering clients."""
    # Create clients with different statuses
    active_client = {**sample_client_data, "name": "Active Client", "status": "active"}
    inactive_client = {**sample_client_data, "name": "Inactive Client", "status": "inactive", "pan": "ABCDE1235F"}
    
    client.post("/api/v1/clients", json=active_client)
    client.post("/api/v1/clients", json=inactive_client)

    # Filter by status
    response = client.get("/api/v1/clients?status=active")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["status"] == "active"

