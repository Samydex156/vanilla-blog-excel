# Implementation Plan - Minimalist Excel Hub

Redesign the resources page to follow a clean, minimalist aesthetic with a sidebar navigation and a central content list.

## 1. Design System (Minimalist)
- **Typography**: Clean sans-serif (Inter). Use weight and size for hierarchy instead of many colors.
- **Color Palette**: 
  - Background: Pure white (#ffffff) or very light gray (#f9fafb).
  - Text: High contrast dark slate (#1e293b).
  - Accent: Subtle Excel Green (#1D6F42) used only for active states and primary actions.
- **Layout**: 
  - **Sidebar**: A fixed or collapsible left sidebar for categories.
  - **Main Area**: A wide, clean space for the list of guides.
  - **Cards to List**: Replace bulky cards with streamlined list items or small, elegant tiles.

## 2. Content Structure
- **Sidebar Navigation**:
  - Archivos Base
  - Prácticas
  - Guías (Active)
  - Atajos
  - Herramientas
  - AI + Excel
- **Main Content**: A "Guías de Excel Básico" section with a list of available guides.

## 3. Example Guides
- Create a `guides/` directory.
- Generate `guia-introduccion.html`: Basics of the interface, cells, and ranges.
- Generate `guia-formulas-basicas.html`: Sum, Average, Count, and basic operators.

## 4. Technical Tasks
- Rewrite `main-style.css` for the minimalist layout.
- Update `index.html` with the sidebar and list structure.
- Create the example guide files.
