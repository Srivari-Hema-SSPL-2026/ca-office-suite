---
document_type: "Guide"
version: "1.0"
status: "Active"
audience: ["Developers", "QA"]
---

# How to Execute the Solution

**Version**: 1.0  
**Last Updated**: December 7, 2025

---

## Overview

This document provides step-by-step instructions for running the CA Office Suite application in development and production environments.

---

## Prerequisites

Before executing the solution, ensure you have completed the setup as described in [05_Setup-and-Prerequisites.md](./05_Setup-and-Prerequisites.md).

---

## Development Mode

### Frontend Development Server

#### Step 1: Navigate to Frontend Directory

```bash
cd src/CAOfficeSuite.Web
```

#### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

#### Step 3: Start Development Server

```bash
npm run dev
```

The development server will start and you should see output similar to:

```plaintext
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### Step 4: Access the Application

Open your browser and navigate to:

- **Local**: `http://localhost:5173/`
- The application will automatically reload when you make changes to the code

#### Step 5: Stop the Development Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Available Scripts

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint
```

### Build Scripts

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

---

## Running Tests

### Unit Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files Location

Tests are located in:

- `src/CAOfficeSuite.Web/src/test/` - Test files
- `src/CAOfficeSuite.Web/src/test/setup.ts` - Test setup configuration

---

## Production Build

### Step 1: Build the Application

```bash
cd src/CAOfficeSuite.Web
npm run build
```

This will create a `dist` folder with optimized production files.

### Step 2: Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Step 3: Deploy

The `dist` folder contains all static files ready for deployment to:

- Static hosting services (Netlify, Vercel, GitHub Pages)
- Web servers (Nginx, Apache)
- CDN services

---

## Backend Services (Future)

When backend services are implemented, you'll need to run:

### .NET Aspire BFF

```bash
# Navigate to backend directory (when created)
cd backend/CAOfficeSuite.BFF

# Run the application
dotnet run
```

### Python FastAPI Services

```bash
# Navigate to Python services directory (when created)
cd services

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload
```

### Using Docker Compose (Future)

```bash
# From project root
docker-compose up

# Or in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

---

## Development Workflow

### Typical Development Session

1. **Start Development Server**

   ```bash
   cd src/CAOfficeSuite.Web
   npm run dev
   ```

2. **Make Code Changes**
   - Edit files in `src/CAOfficeSuite.Web/src/`
   - Changes are automatically reflected in the browser (Hot Module Replacement)

3. **Run Tests**

   ```bash
   npm test
   ```

4. **Check Code Quality**

   ```bash
   npm run lint
   ```

5. **Build for Testing**

   ```bash
   npm run build
   npm run preview
   ```

---

## Troubleshooting

### Issue: Port 5173 already in use

**Solution**: Use a different port

```bash
npm run dev -- --port 3000
```

Or update `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Issue: Changes not reflecting in browser

**Solution**:

- Hard refresh the browser (Ctrl + Shift + R or Cmd + Shift + R)
- Clear browser cache
- Restart the development server

### Issue: Build fails

**Solution**:

```bash
# Clear build artifacts
rm -rf dist node_modules

# Reinstall dependencies
npm install

# Try building again
npm run build
```

### Issue: Tests failing

**Solution**:

```bash
# Clear test cache
npm test -- --clearCache

# Run tests with verbose output
npm test -- --verbose
```

### Issue: TypeScript errors

**Solution**:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## Environment-Specific Configuration

### Development Environment

- Uses mock data (no backend required)
- Hot Module Replacement enabled
- Source maps enabled for debugging
- Verbose logging

### Production Environment

- Optimized and minified code
- No source maps (smaller bundle size)
- Production API endpoints
- Error tracking enabled

---

## Performance Tips

### Development

- Use browser DevTools for performance profiling
- Enable React DevTools extension
- Monitor network requests in browser DevTools

### Production

- Enable gzip compression on server
- Use CDN for static assets
- Implement lazy loading for routes
- Optimize images before deployment

---

## Security Considerations

### Development Security

- Never commit `.env` files with sensitive data
- Use environment variables for configuration
- Keep dependencies updated

### Production Security

- Use HTTPS for all connections
- Implement proper authentication
- Validate all user inputs
- Use secure headers
- Regular security audits

---

## Next Steps

After successfully running the application:

1. Explore the application features
2. Review [01_Requirements.md](./01_Requirements.md) for feature details
3. Check [02_Architecture.md](./02_Architecture.md) for architecture understanding
4. Read [04_Portal-React-UI-Requirements.md](./04_Portal-React-UI-Requirements.md) for UI guidelines

---

## Related Documents

- [Setup and Prerequisites](./05_Setup-and-Prerequisites.md)
- [Requirements](./01_Requirements.md)
- [Architecture](./02_Architecture.md)
- [Technology Stack](./03_Technology-Stack.md)
- [Main README](../README.md)
