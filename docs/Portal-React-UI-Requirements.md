# Portal React.js UI Requirements

## 1. Layout & Structure

- **Sticky Top Navbar**
  - Always visible at the top while scrolling.
  - Contains logo/app name, primary navigation (Home, Client Control, Tasks Mgt, Help), and user profile/login state.
  - Collapses appropriately on smaller screens (mobile/tablet) into a hamburger or drawer menu.

- **Sticky Footer**
  - Always visible at the bottom of the viewport when content is short, otherwise follows the page content.
  - Contains copyright, version info, and quick links (e.g., Help, Privacy, Terms).

- **Page Shell**
  - Common layout component with regions: `Header (Navbar)`, `Main Content`, `Footer`.
  - Use responsive grid/flexbox to handle content on different screen sizes.

## 2. Typography & Icons

- **Fonts**
  - Use Google Fonts (e.g., `Inter`, `Roboto`, or similar clean sans-serif).
  - Define a global typography scale for headings, body text, captions.

- **Icons**
  - Use Font Awesome or a similar modern icon library (e.g., React Icons, Material Icons).
  - Icons for navigation items, buttons (add, edit, delete, save), status indicators, and alerts.

## 3. Visual Design

- **Color Palette**
  - Soft, professional colors suitable for a CA office (e.g., blues, teals, greys, subtle accents).
  - Ensure sufficient contrast for readability and accessibility (WCAG AA where possible).

- **Look & Feel**
  - Clean, uncluttered, business-like design.
  - Rounded corners, subtle shadows, and hover states for interactive elements.
  - Consistent spacing, margins, and paddings across the app.

- **Responsiveness**
  - Fully responsive layout supporting desktop, tablet, and mobile.
  - Navigation adapts on smaller screens (drawer, bottom bar, or collapsible menu).
  - Tables and lists should degrade nicely (horizontal scroll or card view on mobile).

## 4. Core Screens & Navigation

- **Authentication (Login/Logout)**
  - Simple login form with email/username and password.
  - Show clear validation messages and error feedback.
  - After login, redirect to `Home`.
  - Visible logout action in navbar (e.g., profile dropdown or button).

- **Home Dashboard**
  - Overview of key information: upcoming deadlines, open tasks, recent clients, and alerts.
  - Quick links/tiles to `Client Control`, `Tasks Management`, and `Help`.

- **Client Control**
  - List of clients with search, filter, and pagination.
  - Key columns: Client Name, PAN/GSTIN, Contact, Status, Next Due Date.
  - Detail view for a client: core info, active engagements, tasks, and documents.
  - Actions: add new client, edit client, deactivate/activate.

- **Tasks Management (Tasks Mgt)**
  - List of tasks with filters by status, due date, assignee, and type (GST, ITR, TDS, Audit, etc.).
  - Visual indicators for priority and overdue tasks.
  - Task detail view with description, client link, due date, assignee, status, and activity log.

- **Help**
  - Static or semi-static content with FAQs, user guide links, and contact/support information.
  - Optionally, link to external documentation in `docs/`.

## 5. UX & Interaction

- **Navigation**
  - Primary routes: `Login`, `Home`, `Client Control`, `Tasks Mgt`, `Help`.
  - Use React Router (or similar) for client-side routing.

- **State & Feedback**
  - Loading spinners/skeletons for data fetches.
  - Toasts/alerts for success, error, and warning messages.
  - Confirmations for destructive actions (e.g., delete client, delete task).

- **Forms**
  - Client and task forms should use consistent field styles and validation.
  - Inline validation messages (e.g., required fields, invalid formats).

## 6. Technical Notes

- **Tech Stack (UI)**
  - React.js (latest stable version).
  - Preferred styling approach: CSS-in-JS (e.g., styled-components, Emotion), Tailwind CSS, or CSS Modules (to be finalized for the project).
  - Icon library: Font Awesome React, React Icons, or similar.

- **Accessibility**
  - Keyboard-friendly navigation.
  - Proper ARIA attributes for interactive components where needed.

- **Theming & Extensibility**
  - Centralized theme configuration for colors, typography, and spacing.
  - Ability to adjust branding (logo, primary color) with minimal changes.
