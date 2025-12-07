# ⭐ Chartered Accountants Office Suite

A modern, scalable, and fully integrated office management platform designed specifically for Chartered Accountants and tax professionals. The suite centralizes all core operations—clients, compliance tasks, filings, documents, billing, workflows, and analytics—into a unified digital workspace.

Built with React.js, .NET Aspire, Python (FastAPI), PostgreSQL, and secure document storage, it streamlines daily operations and enhances productivity across the entire CA practice.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture Overview](#-architecture-overview)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#configuration)
- [Development Tools & AI Assistance](#-development-tools--ai-assistance)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support & Contact](#-support--contact)
- [Developed By](#-developed-by)

---

## ⭐ Key Features

### 1. Client Control & Engagement

Maintain detailed client profiles including identifiers, registrations, PAN, file numbers, contact details, documentation, engagement type, assigned staff, compliance history, billing information, and more. Quickly filter, search, and manage clients across practice areas.

**Capabilities:**

- Comprehensive client database with advanced search and filtering
- Multi-engagement tracking per client
- Staff assignment and workload management
- Document association and history tracking
- Client communication logs

### 2. Task & Compliance Management

Plan, assign, and track compliance work such as GST, ITR, TDS, audits, ROC filings, and other statutory tasks. Includes due dates, target dates, escalations, reminders, workload distribution, and real-time progress tracking.

**Capabilities:**

- Task creation, assignment, and prioritization
- Compliance calendar with deadline tracking
- Automated reminders and notifications
- Workload balancing across team members
- Progress monitoring and reporting

### 3. Returns & Filings Management

Streamline the preparation and filing of GST returns, income tax returns, audit reports, TDS returns, and statutory forms. Track filing status, e-verification, acknowledgements, deadlines, and post-filing tasks with structured workflows.

**Capabilities:**

- Filing status tracking (Draft, Submitted, Verified, Acknowledged)
- E-verification workflow management
- Acknowledgement receipt storage
- Deadline alerts and escalation
- Post-filing task automation

### 4. Billing, Invoicing & Payments

Generate professional invoices, manage fees and receivables, record payments, reconcile client accounts, and maintain audit-friendly financial records. Supports multiple payment modes and full billing history per client.

**Capabilities:**

- Professional invoice generation
- Multiple payment mode support
- Receivables tracking and aging reports
- Payment reconciliation
- Financial audit trails

### 5. Document Management System (DMS)

Securely store, categorize, and retrieve client documents, working papers, invoices, acknowledgements, and statutory reports. Supports versioning, metadata tagging, folder organization, search, and document previews.

**Capabilities:**

- Secure document storage with encryption
- Version control and document history
- Advanced search with metadata filtering
- Folder-based organization
- Document preview and download

### 6. Workflow Automation & Notifications (Work Processes)

Standardize office processes using reusable **work processes** (workflows). Automate reminders for due dates, missing documents, pending approvals, e-verification follow-ups, and compliance cycles. Work process engine enables complex business process automation, reduces manual tracking, and improves consistency.

**Capabilities:**

- **Work Processes** - Workflow engine for business process automation
- Customizable workflow templates
- Automated notification system
- Rule-based task assignment
- Escalation management
- Process standardization
- Workflow orchestration
- State machine management

### 7. Analytics, Dashboards & Reporting (Heavy Dashboards)

Gain instant visibility into workload, compliance deadlines, pending filings, team productivity, billing reports, revenue insights, client distribution, and operational KPIs. **Heavy dashboards** with advanced analytics, real-time data visualization, and interactive charts provide powerful, actionable insights.

**Capabilities:**

- **Heavy Dashboards** - Advanced analytics and visualization services
- Real-time dashboard with key metrics and live data updates
- Customizable reports and visualizations
- Interactive charts and graphs
- Team productivity analytics
- Revenue and billing insights
- Compliance status overview
- Data aggregation and complex queries
- Export capabilities (PDF, Excel, CSV)

---

## 🛠 Technology Stack

### Frontend

- **React.js 19** - Modern UI framework for building responsive interfaces
- **TypeScript 5** - Type-safe JavaScript for better code quality
- **State Management** - React Context API (AuthContext), may expand to Redux/Zustand
- **Build Tool** - Vite 7
- **Routing** - React Router 7
- **Icons** - Font Awesome 7
- **UI Components** - Advanced Data Grid with column management, pagination, sorting, and filtering
- **Testing** - Vitest 4

### Backend

- **.NET Aspire** - Cloud-native application framework
  - **BFF (Backend For Frontend)** - Hosts React.js frontend
  - **API Gateway** - Service orchestration and routing
- **Python FastAPI** - Primary backend services (preferred)
  - Business logic services
  - Analytics and dashboard services
  - Data processing services
- **Work Processes** - Workflow engine for business process automation
- **RESTful APIs** - Standardized API architecture

### Database & Storage

- **PostgreSQL** - Primary relational database
- **Document Storage** - Secure file storage system (Azure Blob / AWS S3 / Local)
- **Caching** - Redis (for caching, session management, and real-time data)

### Infrastructure & DevOps

- **Containerization** - Docker
- **Orchestration** - Docker Compose / Kubernetes (TBD)
- **CI/CD** - GitHub Actions / Azure DevOps (TBD)
- **Monitoring** - Application insights and logging

### Security

- **Authentication** - JWT / OAuth 2.0
- **Authorization** - Role-based access control (RBAC)
- **Data Encryption** - At-rest and in-transit encryption
- **Audit Logging** - Comprehensive audit trails

---

## 🏗 Architecture Overview

The application follows a **Backend For Frontend (BFF) pattern** with API Gateway orchestration:

```text
┌─────────────────────────────────────────────────────────┐
│         Backend For Frontend (BFF) - .NET Aspire         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React.js Frontend (Hosted in BFF)               │  │
│  │  src/CAOfficeSuite.Web/                          │  │
│  │  User Interface & Client Logic                     │  │
│  └──────────────────┬───────────────────────────────┘  │
│                      │                                    │
│  ┌──────────────────┴───────────────────────────────┐  │
│  │  API Gateway (Inside Aspire)                       │  │
│  │  Service Orchestration & Routing                   │  │
│  └──────┬──────────────┬──────────────┬──────────────┘  │
│         │              │              │                  │
└─────────┼──────────────┼──────────────┼──────────────────┘
          │              │              │
┌─────────▼──────┐ ┌─────▼──────┐ ┌─────▼────────┐
│  Python        │ │  Python    │ │  Work        │
│  FastAPI       │ │  FastAPI    │ │  Processes  │
│  Services      │ │  (Analytics)│ │  (Workflows)│
│  (Primary)      │ │  (Dashboards)│ │             │
└─────────┬──────┘ └─────┬──────┘ └─────┬────────┘
          │                │              │
┌─────────┴────────────────┴──────────────┴──────┐
│         PostgreSQL Database                     │
│      + Document Storage System                  │
│      + Redis Cache                               │
└──────────────────────────────────────────────────┘
```

**Key Architecture Decisions:**
- **BFF Pattern**: React.js frontend is hosted inside the .NET Aspire BFF
- **API Gateway**: Centralized routing and orchestration within Aspire
- **Python FastAPI**: Primary backend services (preferred technology)
- **Work Processes**: Workflow engine for business process automation
- **Heavy Dashboards**: Advanced analytics and visualization services

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) and npm/yarn
- **.NET SDK** (8.0 or higher)
- **Python** (3.10 or higher) and pip
- **PostgreSQL** (14.x or higher)
- **Docker** and Docker Compose (optional, for containerized setup)
- **Git** for version control

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-org/ca-office-suite.git
cd ca-office-suite
```

### Quick Start (Development)

1. **Set up the database:**

   ```bash
   # Create PostgreSQL database
   createdb ca_office_suite
   ```

2. **Configure environment variables:**

   ```bash
   # Copy example environment files
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install dependencies:**

   ```bash
   # Frontend
   cd src/CAOfficeSuite.Web
   npm install
   
   # Backend (.NET) - Future
   # cd ../backend
   # dotnet restore
   
   # Python services - Future
   # cd ../services
   # pip install -r requirements.txt
   ```

4. **Run database migrations:**

   ```bash
   # .NET migrations
   dotnet ef database update
   ```

5. **Start the application:**

   ```bash
   # Frontend (current)
   cd src/CAOfficeSuite.Web
   npm run dev
   
   # Backend services - Future
   # Using Docker Compose (when available)
   # docker-compose up
   # Or run services individually
   # Backend: dotnet run
   # Python API: uvicorn main:app --reload
   ```

---

## 📁 Project Structure

```text
ca-office-suite/
├── src/
│   └── CAOfficeSuite.Web/   # React.js frontend application
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   │   ├── common/  # DataGrid, ColumnManager
│       │   │   └── layout/  # Navbar, Footer, Layout
│       │   ├── pages/       # Page components (Home, Login, Clients, Tasks, Help)
│       │   ├── services/    # API service layer (currently mock data)
│       │   ├── store/       # State management (AuthContext)
│       │   ├── types/       # TypeScript type definitions
│       │   └── test/        # Test files
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── docs/                     # Documentation
│   ├── 01_Requirements.md
│   ├── 02_Architecture.md
│   ├── 03_Technology-Stack.md
│   ├── 04_Portal-React-UI-Requirements.md
│   ├── 05_Setup-and-Prerequisites.md
│   ├── 06_How-to-Execute.md
│   └── images/
│
├── .cursor/                  # Cursor IDE rules and guidelines
│   └── rules/               # Cursor AI coding rules
│       ├── 01_project-context.mdc
│       ├── 02_code-generation-guidelines.mdc
│       ├── 03_best-practices.mdc
│       ├── 04_common-patterns.mdc
│       ├── 05_naming-conventions.mdc
│       ├── 06_database-design.mdc
│       ├── 07_ai-reasoning-framework.mdc
│       └── README.md
│
├── tools/                    # Development tools (future)
├── tests/                    # Integration tests (future)
├── LICENSE
└── README.md                 # This file

Note: Backend services (.NET Aspire, Python FastAPI) and database 
migrations will be added in future phases.
```

---

## ⚙️ Configuration

### Environment Variables

Key environment variables to configure:

```env
# Database
DATABASE_CONNECTION_STRING=Host=localhost;Database=ca_office_suite;Username=postgres;Password=your_password

# JWT Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRATION_MINUTES=60

# Document Storage
STORAGE_TYPE=local|azure|aws
STORAGE_CONNECTION_STRING=your-storage-connection-string

# API URLs
FRONTEND_URL=http://localhost:3000
BACKEND_API_URL=http://localhost:5000
PYTHON_API_URL=http://localhost:8000

# Email (for notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

---

## 🤖 Development Tools & AI Assistance

This project includes configuration files for AI-powered development tools to enhance productivity and maintain code quality.

### Cursor IDE Rules

The `.cursor/rules/` directory contains comprehensive coding guidelines and rules for Cursor IDE:

- **Project Context** - Architecture and project overview
- **Code Generation Guidelines** - Standards for AI-assisted code generation
- **Best Practices** - Development best practices and patterns
- **Common Patterns** - Reusable code patterns and templates
- **Naming Conventions** - Consistent naming standards
- **Database Design** - Database design principles
- **AI Reasoning Framework** - Guidelines for AI-assisted reasoning

These rules help ensure consistent code quality and assist AI tools in generating code that aligns with project standards.

### GitHub Copilot Instructions

The `.github/copilot-instructions.md` file contains specific instructions for GitHub Copilot, including:

- General coding guidelines
- Frontend (React) development standards
- Backend/API development practices
- Testing requirements
- Documentation standards

These instructions help Copilot understand the project's context and generate appropriate code suggestions.

---

## 📚 API Documentation

API documentation is available at:

- **Swagger UI**: `http://localhost:5000/swagger` (when running)
- **FastAPI Docs**: `http://localhost:8000/docs` (when running)

For detailed API reference, see [docs/api/README.md](docs/api/README.md)

---

## 🚢 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Production Deployment

1. **Build the application:**

   ```bash
   # Frontend
   cd src/CAOfficeSuite.Web && npm run build
   
   # Backend (when available)
   # cd backend && dotnet publish -c Release
   ```

2. **Set up production environment variables**

3. **Run database migrations**

4. **Deploy to your hosting platform** (Azure, AWS, etc.)

For detailed deployment instructions, see [docs/deployment.md](docs/deployment.md)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:

- Code follows the project's style guidelines
- Tests are added/updated for new features
- Documentation is updated as needed
- All tests pass before submitting

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-org/ca-office-suite/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/ca-office-suite/discussions)
- **Email**: [support@example.com](mailto:support@example.com)

---

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Designed for the CA and tax professional community
- Inspired by the need for better office management tools in the accounting profession

---

## 🏢 Developed By

**Srivari Software Solutions Private Limited**

---

**⭐ Star this repository if you find it useful!**
