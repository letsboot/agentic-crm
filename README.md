# Agentic CRM

[Based on the full stack fastapi template](https://github.com/fastapi/full-stack-fastapi-template)

A modern Customer Relationship Management (CRM) application built with FastAPI and React, designed for managing contacts and organizations efficiently.

## Features

- 📋 **Contact Management**: Create, read, update, and delete contacts with organization and description fields
- 👥 **User Management**: Secure user authentication and authorization
- 🔒 **Security**: JWT authentication with secure password hashing
- 📱 **Responsive UI**: Modern React frontend with Chakra UI components
- 🌙 **Dark Mode**: Built-in dark mode support
- 🔄 **Real-time Updates**: Automatic client generation for seamless API integration

## Technology Stack

### Backend
- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) - Python web framework for building APIs
- 🧰 [**SQLModel**](https://sqlmodel.tiangolo.com) - SQL database interactions with Python type hints
- 🔍 [**Pydantic**](https://docs.pydantic.dev) - Data validation and settings management
- 💾 [**PostgreSQL**](https://www.postgresql.org) - Primary database
- 🔑 **JWT Authentication** - Secure token-based authentication
- ✅ [**Pytest**](https://pytest.org) - Testing framework

### Frontend
- 🚀 [**React**](https://react.dev) - Modern frontend framework
- 💃 **TypeScript** - Type-safe JavaScript
- ⚡ [**Vite**](https://vitejs.dev) - Fast build tool and dev server
- 🎨 [**Chakra UI**](https://chakra-ui.com) - Component library
- 🤖 **Auto-generated Client** - Type-safe API client
- 🧪 [**Playwright**](https://playwright.dev) - End-to-end testing

### DevOps
- 🐋 [**Docker Compose**](https://www.docker.com) - Containerized development and deployment
- 📞 [**Traefik**](https://traefik.io) - Reverse proxy and load balancer

## Data Model

### Contact
- **ID**: Unique identifier (UUID)
- **Organisation**: Company or organization name (required)
- **Description**: Optional description or notes
- **Owner**: Associated user who created the contact

### User
- **ID**: Unique identifier (UUID)
- **Email**: User's email address (unique)
- **Full Name**: User's display name
- **Password**: Securely hashed password
- **Contacts**: List of contacts owned by the user

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js (for frontend development)
- Python 3.11+ (for backend development)

### Development Setup

1. **Start the application**:
   ```bash
   docker compose up --force-recreate --build --detach
   ```

2. **Enable watch mode for development**:
   ```bash
   tmux new-session -d -s crm-app 'docker compose watch'
   ```

3. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

4. **Default development credentials**:
   - Email: `dev@example.com`
   - Password: `DevPassword`

### Development Commands

- **Regenerate API client** (after backend changes):
  ```bash
  scripts/generate-client.sh
  ```

- **Run backend tests**:
  ```bash
  docker exec crm-fastapi-react-backend-1 python3 -m pytest
  ```

- **Run frontend tests**:
  ```bash
  cd frontend
  docker compose run --rm playwright npx playwright test --reporter=line
  ```

- **Install frontend dependencies**:
  ```bash
  cd frontend
  npm install
  ```

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core functionality (auth, config, db)
│   │   ├── models.py       # SQLModel data models
│   │   ├── crud.py         # Database operations
│   │   └── tests/          # Backend tests
│   └── scripts/            # Backend utility scripts
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── routes/         # Application routes
│   │   ├── client/         # Auto-generated API client
│   │   └── hooks/          # Custom React hooks
│   └── tests/              # Frontend E2E tests
└── scripts/                # Project-wide scripts
```

## API Endpoints

### Contacts
- `GET /api/v1/contacts/` - List contacts (paginated)
- `POST /api/v1/contacts/` - Create new contact
- `GET /api/v1/contacts/{id}` - Get contact by ID
- `PUT /api/v1/contacts/{id}` - Update contact
- `DELETE /api/v1/contacts/{id}` - Delete contact

### Authentication
- `POST /api/v1/login/access-token` - Login
- `POST /api/v1/login/test-token` - Test token validity
- `POST /api/v1/password-recovery/{email}` - Password recovery
- `POST /api/v1/reset-password/` - Reset password

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `PUT /api/v1/users/me/password` - Change password

## Configuration

Key environment variables in `.env`:

- `SECRET_KEY` - JWT secret key
- `FIRST_SUPERUSER_PASSWORD` - Initial admin password
- `POSTGRES_PASSWORD` - Database password
- `ENVIRONMENT` - Development/production environment

## Testing

The application includes comprehensive testing:

- **Backend**: Unit tests with Pytest
- **Frontend**: End-to-end tests with Playwright
- **API**: Interactive documentation at `/docs`

## Development Workflow

1. Make changes to backend models in `backend/app/models.py`
2. Create database migration: `alembic revision --autogenerate -m "description"`
3. Regenerate frontend client: `scripts/generate-client.sh`
4. Update frontend components as needed
5. Run tests to ensure everything works
6. Docker containers automatically rebuild in watch mode

## License

This project is licensed under the terms of the MIT license.
