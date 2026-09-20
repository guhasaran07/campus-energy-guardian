# Campus Energy Leak Detector

## Goal
Build a polished, responsive smart-campus monitoring prototype that judges can explore immediately with consistent local sample data and no external services.

## What I’ll build
- A persistent desktop sidebar, mobile navigation, top search, notifications, date/time, profile area, footer, and responsive app shell.
- Eight working pages: Dashboard, Energy Monitoring, Leak Detection, Rooms, Room Details, Analytics, Alerts, Cost & Savings, and Settings.
- Dashboard overview with the requested introduction, KPI cards, live-style consumption chart, active leak controls, and clickable campus schematic.
- Detailed monitoring charts, time/building/room/day-type filters, tooltips, and room comparison table.
- Interactive leak simulator using the specified baseline, z-score guards, tariff, waste, cost, duration, and severity calculations.
- Searchable/filterable rooms, room detail charts, explanation panels, and locally resolvable alerts.
- Analytics, validation results, detection-floor comparison, baseline explanation, data-collection flow, limitations, and future roadmap.
- Alert tabs, filtering, view/resolve/dismiss actions, confirmation dialogs, and visible success notifications.
- Cost and savings KPIs, charts, formulas, and judge-friendly calculation explanations.
- Settings stored locally for detection, energy tariff, and notification preferences.

## Shared behavior and data
- Centralized deterministic mock data for buildings, rooms, readings, alerts, and chart series.
- Shared local application state so resolving an alert updates active counts and room status across pages.
- Functional navigation, search, filters, buttons, dialogs, loading transitions, and empty states.

## Visual direction
- Dense professional dashboard with charcoal/navy surfaces, crisp light content panels, cyan energy signals, and green sustainability accents.
- Compact typography, restrained gradients, subtle elevation, rounded panels, pulse only for active critical leaks, and reduced-motion support.
- Responsive grids and scroll-safe tables for desktop, tablet, and mobile.

## Technical details
- TanStack Start/React/TypeScript/Vite with Tailwind CSS v4, Recharts, and Lucide icons.
- Semantic design tokens in the global stylesheet, reusable page and chart components, and route-specific metadata.
- No backend, authentication, API keys, or fabricated live-data claims.

## Validation
- Verify the app compiles through the project harness.
- Exercise navigation, simulator calculations, filters, alert resolution/dismissal, room details, and settings persistence.
- Inspect desktop and mobile layouts for overflow, clipping, chart sizing, and menu behavior.
