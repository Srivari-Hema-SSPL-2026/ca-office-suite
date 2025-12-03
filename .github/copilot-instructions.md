# GitHub Copilot Instructions for `ca-office-suite`

## General Guidelines
- Follow existing code style, folder structure, and naming conventions.
- Prefer clarity and maintainability over clever or overly compact code.
- Avoid introducing new dependencies unless necessary; if needed, summarize why.

## Frontend (React Portal UI)
- Use modern React (functional components, hooks) and TypeScript if the project uses it.
- Keep layout consistent with the requirements in `docs/Portal-React-UI-Requirements.md`.
- Use a shared layout component for sticky navbar and sticky footer.
- Ensure components are responsive and accessible (ARIA where applicable).

## Backend / API (If Present)
- Keep API contracts explicit and documented in code or `docs/`.
- Validate all inputs server-side; treat client as untrusted.
- Handle errors in a user-friendly way on the UI and with structured logs on the server.

## Testing
- When adding non-trivial logic, add or update tests following the project’s existing test patterns.
- Prefer small, focused tests for critical business logic.

## Documentation
- Update `README.md` and files in `docs/` when adding new major features or flows.
- Keep documentation concise, task-oriented, and aligned with the actual implementation.

## AI Assistant Behavior
- Do not modify licensing headers or repository licenses.
- Do not commit changes or modify git history.
- Keep changes minimal and scoped to the requested task unless explicitly asked to refactor more broadly.
