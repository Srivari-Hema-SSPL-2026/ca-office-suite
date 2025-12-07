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

1. **Client Control & Engagement** - Comprehensive client database with advanced search, filtering, and multi-engagement tracking
2. **Task & Compliance Management** - Plan, assign, and track compliance work (GST, ITR, TDS, audits, ROC filings)
3. **Returns & Filings Management** - Streamline preparation and filing of returns with status tracking and workflows
4. **Billing, Invoicing & Payments** - Professional invoice generation, receivables tracking, and payment reconciliation
5. **Document Management System (DMS)** - Secure document storage with versioning, metadata tagging, and advanced search
6. **Workflow Automation & Notifications (Work Processes)** - Workflow engine for business process automation
7. **Analytics, Dashboards & Reporting (Heavy Dashboards)** - Advanced analytics with real-time data visualization and interactive charts

For detailed feature requirements and capabilities, see [01_Requirements.md](docs/01_Requirements.md).

---

## 🛠 Technology Stack

**Frontend:** React.js 19, TypeScript 5, Vite 7, React Router 7, Font Awesome 7, Advanced Data Grid, Vitest 4

**Backend:** .NET Aspire (BFF + API Gateway), Python FastAPI (Primary), Work Processes, RESTful APIs

**Database & Storage:** PostgreSQL, Redis, Document Storage (Azure Blob / AWS S3 / Local)

**Infrastructure:** Docker, Docker Compose / Kubernetes, CI/CD (GitHub Actions / Azure DevOps), Monitoring

**Security:** JWT / OAuth 2.0, RBAC, Data Encryption, Audit Logging

For detailed technology stack information, see [03_Technology-Stack.md](docs/03_Technology-Stack.md).

---

## 🏗 Architecture Overview

The application follows a **Backend For Frontend (BFF) pattern** with API Gateway orchestration:

- **BFF Pattern**: React.js frontend hosted inside .NET Aspire BFF
- **API Gateway**: Centralized routing and orchestration within Aspire
- **Python FastAPI**: Primary backend services (preferred)
- **Work Processes**: Workflow engine for business process automation
- **Heavy Dashboards**: Advanced analytics and visualization services

For detailed architecture documentation including diagrams, layers, communication patterns, and scalability considerations, see [02_Architecture.md](docs/02_Architecture.md).

---

## 📦 Prerequisites

**Required:**
- **Node.js** and npm/yarn
- **Git** for version control

**Optional (for future backend development):**
- **.NET SDK**
- **Python** and pip
- **PostgreSQL**
- **Docker** and Docker Compose

For detailed version requirements and setup instructions, see [05_Setup-and-Prerequisites.md](docs/05_Setup-and-Prerequisites.md).

---

## 🚀 Getting Started

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/ca-office-suite.git
   cd ca-office-suite
   ```

2. **Install and run frontend:**
   ```bash
   cd src/CAOfficeSuite.Web
   npm install
   npm run dev
   ```

3. **Access the application:**
   - Open `http://localhost:5173/` in your browser

For detailed setup and execution instructions, see:
- [Setup and Prerequisites](docs/05_Setup-and-Prerequisites.md)
- [How to Execute](docs/06_How-to-Execute.md)

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
│   ├── 07_Development-Roadmap.md
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

For environment variable configuration, see [05_Setup-and-Prerequisites.md](docs/05_Setup-and-Prerequisites.md#environment-variables).

**Note**: Currently, the frontend uses mock data, so environment variables are not required for basic development.

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

API documentation will be available when backend services are implemented:

- **Swagger UI**: `http://localhost:5000/swagger` (.NET services)
- **FastAPI Docs**: `http://localhost:8000/docs` (Python FastAPI services)

For API documentation tools and details, see [03_Technology-Stack.md](docs/03_Technology-Stack.md#api-documentation).

---

## 🚢 Deployment

### Production Build

```bash
# Frontend
cd src/CAOfficeSuite.Web
npm run build
```

The `dist` folder contains optimized production files ready for deployment.

For detailed deployment instructions and production configuration, see [06_How-to-Execute.md](docs/06_How-to-Execute.md#production-build).

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
