# CA Office Suite - FastAPI Backend

This directory contains the FastAPI backend service for Client Control & Engagement Management.

## Project Structure

```
src/api/
├── main.py              # FastAPI application entry point
├── config.py            # Configuration and settings
├── database.py          # Database connection and session management
├── models/              # SQLAlchemy ORM models
│   ├── client.py
│   └── engagement.py
├── schemas/             # Pydantic models for request/response
│   ├── client.py
│   └── engagement.py
├── services/            # Business logic layer
│   ├── client_service.py
│   └── engagement_service.py
├── routers/             # API route handlers
│   ├── clients.py
│   └── engagements.py
└── requirements.txt     # Python dependencies
```

## Setup

### Prerequisites

- Python 3.12+
- PostgreSQL 14+ running
- Database schema applied (see `docs/database/schema.sql`)

### Installation

1. Install Python dependencies:
```bash
cd src/api
pip install -r requirements.txt
```

2. Set environment variables:
```bash
export DATABASE_URL='postgresql://user:password@localhost:5432/caoffice'
```

Or create a `.env` file in `src/api/`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/caoffice
DEBUG=False
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

## Running the API

### Development Mode

```bash
cd src/api
uvicorn main:app --reload --port 8000
```

### Production Mode

```bash
cd src/api
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the server is running, access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## API Endpoints

### Clients

- `GET /api/clients` - List clients with pagination/filtering/sorting
- `GET /api/clients/{client_id}` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/{client_id}` - Update client
- `DELETE /api/clients/{client_id}` - Delete client
- `GET /api/clients/{client_id}/engagements` - Get client's engagements

### Engagements

- `GET /api/engagements` - List engagements with pagination/filtering/sorting
- `GET /api/engagements/{engagement_id}` - Get single engagement
- `POST /api/engagements` - Create new engagement
- `PUT /api/engagements/{engagement_id}` - Update engagement
- `DELETE /api/engagements/{engagement_id}` - Delete engagement

### Query Parameters

#### Clients List (`GET /api/clients`)

- `page` (int): Page number (default: 1)
- `page_size` (int): Items per page (default: 50, max: 100)
- `search` (str): Search in name, PAN, or email
- `status` (str): Filter by status (active/inactive)
- `sort_by` (str): Sort field (default: name)
- `sort_order` (str): Sort order - asc or desc (default: asc)

#### Engagements List (`GET /api/engagements`)

- `page` (int): Page number (default: 1)
- `page_size` (int): Items per page (default: 50, max: 100)
- `client_id` (UUID): Filter by client
- `status` (str): Filter by engagement status
- `type` (str): Filter by engagement type
- `senior` (str): Filter by senior staff name
- `sort_by` (str): Sort field (default: file_number)
- `sort_order` (str): Sort order - asc or desc (default: asc)

## Example Requests

### Get all clients (paginated)

```bash
curl http://localhost:8000/api/clients?page=1&page_size=10
```

### Search clients by name

```bash
curl http://localhost:8000/api/clients?search=Sri
```

### Get single client

```bash
curl http://localhost:8000/api/clients/8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54
```

### Create new client

```bash
curl -X POST http://localhost:8000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Client",
    "pan": "ABCDE1234F",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "status": "active"
  }'
```

### Get client's engagements

```bash
curl http://localhost:8000/api/clients/8c3c8c2c-0c7c-4724-9df6-40dfd4a3cc54/engagements
```

### Filter engagements by status

```bash
curl http://localhost:8000/api/engagements?status=Filed&page_size=20
```

## Configuration

Environment variables (can be set in `.env` file):

- `DATABASE_URL`: PostgreSQL connection string (required)
- `DEBUG`: Enable debug mode (default: False)
- `CORS_ORIGINS`: List of allowed CORS origins
- `DEFAULT_PAGE_SIZE`: Default pagination size (default: 50)
- `MAX_PAGE_SIZE`: Maximum pagination size (default: 100)

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

## Testing

### Manual Testing

Use the Swagger UI at http://localhost:8000/docs for interactive testing.

### With cURL

See example requests above.

### With Python

```python
import requests

# Get clients
response = requests.get('http://localhost:8000/api/clients')
clients = response.json()

# Create client
new_client = {
    "name": "New Client",
    "pan": "ABCDE1234F",
    "status": "active"
}
response = requests.post('http://localhost:8000/api/clients', json=new_client)
```

## Database Schema

The API expects the following PostgreSQL tables (see `docs/database/schema.sql`):

- `clients`: Client master data
- `engagements`: Engagement/file information

## Development

### Adding New Endpoints

1. Create/update models in `models/`
2. Create Pydantic schemas in `schemas/`
3. Add business logic in `services/`
4. Create route handlers in `routers/`
5. Register router in `main.py`

### Code Style

- Follow PEP 8 guidelines
- Use type hints
- Add docstrings to functions and classes
- Keep functions focused and small

## Troubleshooting

### Database Connection Error

```
Failed to connect to database
```

Solution: Check DATABASE_URL environment variable and ensure PostgreSQL is running.

### Import Errors

```
ModuleNotFoundError: No module named 'fastapi'
```

Solution: Install dependencies with `pip install -r requirements.txt`

### CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

Solution: Add your frontend URL to CORS_ORIGINS in config.py or .env file.
