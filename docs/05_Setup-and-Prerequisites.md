---
document_type: "Guide"
version: "1.0"
status: "Active"
audience: ["Developers"]
---

# Setup and Prerequisites

**Version**: 1.0  
**Last Updated**: December 7, 2025

---

## Overview

This document outlines the prerequisites and setup instructions for the CA Office Suite project. Follow these steps to prepare your development environment.

---

## Prerequisites

### Required Software

#### 1. Node.js and npm

- **Version**: Node.js 22.x (Recommended) or 18.x higher
- **Download**: [https://nodejs.org/](https://nodejs.org/)
- **Verification**:

  ```bash
  node --version
  npm --version
  ```

#### 2. Git

- **Version**: Latest stable version
- **Download**: [https://git-scm.com/](https://git-scm.com/)
- **Verification**:

  ```bash
  git --version
  ```

#### 3. Code Editor (Recommended)

- **Visual Studio Code** - [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **Cursor IDE** - [https://cursor.sh/](https://cursor.sh/)
- Or any editor with TypeScript and React support

### Optional Software (For Future Backend Development)

#### 4. .NET SDK

- **Version**: .NET 10.0 (Recommended) or 8.0 higher
- **Download**: [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
- **Verification**:

  ```bash
  dotnet --version
  ```

#### 5. Python

- **Version**: Python 3.12 (Recommended)
- **Download**: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- **Verification**:

  ```bash
  python --version
  # or
  python3 --version
  ```

#### 6. PostgreSQL

- **Version**: PostgreSQL 14.x or higher
- **Download**: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- **Alternative**: Use Docker for PostgreSQL (see Docker section below)

#### 7. Docker (Optional)

- **Download**: [https://www.docker.com/get-started](https://www.docker.com/get-started)
- Useful for running PostgreSQL, Redis, and other services in containers
- **Verification**:

  ```bash
  docker --version
  docker-compose --version
  ```

---

## Development Environment Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd ca-office-suite
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd src/CAOfficeSuite.Web

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Verify Frontend Setup

```bash
# Check if all dependencies are installed correctly
npm run build

# If successful, you should see a 'dist' folder created
```

---

## Environment Variables

### Frontend Environment Variables

Create a `.env` file in `src/CAOfficeSuite.Web/` (if needed):

```env
# API Configuration (when backend is ready)
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# Feature Flags (optional)
VITE_ENABLE_DEBUG=true
```

**Note**: Currently, the frontend uses mock data, so environment variables are not required for basic development.

### Backend Environment Variables (Future)

When backend services are implemented, you'll need:

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

## IDE Configuration

### Visual Studio Code Extensions (Recommended)

Install the following extensions for better development experience:

- **ES7+ React/Redux/React-Native snippets**
- **TypeScript and JavaScript Language Features** (built-in)
- **ESLint**
- **Prettier - Code formatter**
- **GitLens**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### Cursor IDE

The project includes Cursor IDE rules in `.cursor/rules/` directory. Cursor will automatically use these rules for AI-assisted development.

---

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 8 GB minimum (16 GB recommended)
- **Disk Space**: 2 GB free space
- **Processor**: Dual-core processor or better

### Recommended Requirements

- **RAM**: 16 GB or more
- **Disk Space**: 5 GB free space (for dependencies and build artifacts)
- **Processor**: Quad-core processor or better
- **Internet Connection**: Required for npm package downloads

---

## Troubleshooting

### Common Issues

#### Issue: npm install fails

**Solution**:

- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

#### Issue: Port already in use

**Solution**:

- Change the port in `vite.config.ts` or use `npm run dev -- --port 3001`

#### Issue: TypeScript errors

**Solution**:

- Run `npm run build` to check for type errors
- Ensure all dependencies are installed: `npm install`
- Check `tsconfig.json` configuration

#### Issue: Git authentication errors

**Solution**:

- Configure Git credentials
- Use SSH keys for authentication
- Check repository access permissions

---

## Next Steps

After completing the setup:

1. Review [06_How-to-Execute.md](./06_How-to-Execute.md) for running the application
2. Read [01_Requirements.md](./01_Requirements.md) to understand project requirements
3. Check [02_Architecture.md](./02_Architecture.md) for architecture overview
4. Review [03_Technology-Stack.md](./03_Technology-Stack.md) for technology details

---

## Related Documents

- [How to Execute](./06_How-to-Execute.md)
- [Requirements](./01_Requirements.md)
- [Architecture](./02_Architecture.md)
- [Technology Stack](./03_Technology-Stack.md)
- [Main README](../README.md)
