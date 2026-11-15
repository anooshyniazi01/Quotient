# Quotient — Development Planning

## 1. Project Overview

Quotient is a provider-independent AI API observability and quota management platform.

It allows developers and teams to monitor AI API consumption, track provider limits, manage quotas, analyze requests, identify unusual usage patterns, and prevent unexpected usage interruptions.

The platform supports two integration methods:

- **API Proxy:** Applications route supported AI API requests through Quotient, allowing it to forward requests and collect observable usage information.
- **SDK / Middleware:** Developers instrument their applications to report usage and request metadata without necessarily changing their existing API routing.

Quotient must be developed as a real, reliable software product rather than a static demonstration.

The five primary project documents have separate responsibilities:

- `idea.md` defines the product concept and scope.
- `planning.md` defines how and in what order the product will be built.
- `architecture.md` defines the internal technical system.
- `design.md` defines the visual identity and interface rules.
- `product-specification.md` defines the 17 windows and complete user journey.

When implementing the interface, `design.md` is the single source of truth for visual decisions.

## 2. Development Principles

The following principles must guide the entire development process:

1. Build the product in structured phases.
2. Follow a feature-based, vertical-slice development approach.
3. Complete and test one feature before moving to the next.
4. Maintain consistency across all application windows.
5. Prioritize functionality, reliability, security, and maintainability.
6. Never implement fake buttons, fabricated metrics, or non-functional controls.
7. Keep frontend and backend responsibilities clearly separated.
8. Reuse existing components, services, and logic where appropriate.
9. Document important technical decisions.
10. Do not compromise the established design direction while implementing functionality.
11. Do not invent usage, quota, cost, reset-time, or provider capability information.
12. Keep the visual design purposeful: every visual element should communicate information, establish hierarchy, or support an interaction.

## 3. Design and UI Development Plan

### 3.1 Design Source of Truth

`design.md` is the authoritative visual specification for Quotient.

Do not independently reinterpret or replace its visual decisions during implementation.

The reference prototype, `quotient-preview.html`, is a static visual reference containing fictional demonstration data. It is useful for understanding the intended compositions and navigation, but its sample data and preview-only interactions must be replaced with real functionality.

The implementation must preserve the design system while allowing each window to have a composition appropriate to its purpose.

### 3.2 Brand and Visual Direction

Quotient should feel like precise technical instrumentation: trustworthy, data-rich, calm, and purposeful.

The interface must communicate:

- Technical precision.
- Reliability.
- Control.
- Intelligence.
- Clarity.
- Professionalism.

The design should not look like a generic AI SaaS template.

The core visual principles are:

1. **White first, navy and amber with purpose.** White dominates. Navy carries visual weight in panels, charts, code, and navigation. Amber marks meaningful data and states, including quota fills, forecasts, active markers, and primary actions.
2. **Instrument, not ornament.** Every visual should encode something meaningful, such as usage, limits, flow, or time.
3. **Hierarchy through typography and contrast.** Prefer type, spacing, hairline borders, and background shifts over heavy shadows and rounded containers.
4. **Vary layouts by purpose.** Do not repeat the same title, metric cards, chart, and table composition on every window.
5. **Evidence over chat.** Insights must appear as structured findings with supporting evidence and confidence, not as a generic chatbot.
6. **Always label data provenance.** Provider-reported, observed, estimated, and user-configured values must be visually distinguishable.

### 3.3 Approved Colour System

Use the exact design tokens defined in `design.md`.

Core colours:

| Token | Value | Primary use |
|---|---|---|
| Navy | `#14213D` | Primary text, dark panels, navigation, code, selected states |
| Amber | `#FCA311` | Primary actions, quota fills, highlights, active markers |
| White | `#FFFFFF` | Main page and card surfaces |
| Line | `#E5E5E5` | Borders and dividers |
| Black | `#000000` | Strong contrast only |

Use the supporting navy, amber, neutral, and status tints from `design.md`. Do not create a separate palette or introduce unrelated decorative colours.

Status colours are functional rather than brand colours. Use them only to communicate states such as healthy, failed, or degraded.

### 3.4 Typography

Use the typography system specified in `design.md`:

- **Instrument Serif:** Display typography, page titles, and large metrics. Use regular and italic styles appropriately.
- **Instrument Sans:** Interface text, body copy, controls, and general UI.
- **IBM Plex Mono:** IDs, tokens, endpoints, logs, code, technical labels, and tabular data.

Implement the specified type scale, weights, line heights, eyebrow-label treatment, and tabular numerals. Do not substitute generic system typography without a deliberate technical reason.

### 3.5 Layout and Spacing

Follow the layout rules in `design.md`:

- Use a 4px spacing unit and the defined spacing scale.
- Respect the 1380px page maximum width.
- Use 28px desktop side padding and 16px mobile side padding.
- Use the specified small corner radii rather than pill-shaped containers.
- Prefer 1px hairline borders.
- Reserve shadows for floating layers such as dropdowns, toasts, and overlays.
- Use the measuring-instrument tick motif only in the specified contexts.
- Implement the defined responsive breakpoints: 1180px, 940px, 820px, and 520px.

Do not introduce arbitrary layout values that make the interface inconsistent.

### 3.6 Navigation Implementation

Implement the navigation exactly as defined in `design.md`.

**Navy status strip — 46px**

It contains:

- Quotient wordmark.
- Workspace switcher.
- Environment switcher.
- Live request rate, when available.
- Quota percentage, when meaningful.
- Month-to-date spend, when reliable cost data is available.
- Keyboard shortcut indicator for `Ctrl K`.
- Alerts access.
- User avatar.

Do not display fabricated live indicators. If a value is unavailable, use an appropriate unavailable or setup state.

**Sticky white section bar**

It contains three labelled navigation groups separated by a dotted rule:

- **Monitor:** Overview, Analytics, Quotas, Requests, Insights.
- **Manage:** Providers, Applications, Integrations, Alerts.
- **Workspace:** Team, Settings.

The active item uses the pale amber background, navy text, and 3px amber underline defined in `design.md`.

**Responsive navigation**

At widths of 820px and below, the section bar becomes a fixed, horizontally scrollable bottom navigation bar with icons and short labels.

**Navigation utilities**

- Implement the `Ctrl K` jump palette.
- Implement the prototype's Window nn/17 navigation grid where appropriate.
- Ensure keyboard access, visible focus states, and accessible labels.
- Preserve navigation state and the selected workspace across authenticated windows.

Do not replace this navigation with a conventional fixed sidebar.

### 3.7 Component System

Build reusable components according to the specifications in `design.md`.

The initial component set should include:

- Buttons and button variants.
- Inputs and selects.
- Switches and checkboxes.
- Status badges.
- Tabs and segmented controls.
- Filter chips and dropdowns.
- Data tables.
- Quota meters.
- White, navy, and pale amber panels.
- Modals and confirmation dialogs.
- Detail drawers.
- Toast notifications.
- Code blocks.
- Timelines.
- Provider marks.
- Application glyphs.
- Empty states.

Use shared components when they create genuine consistency. Do not force every window into the same page template.

The component system must include default, hover, focus, active, disabled, loading, success, warning, and error states where relevant.

### 3.8 Data Visualisation

Follow `design.md`: use **custom SVG visualisations; do not introduce a chart library**.

Implement reusable SVG primitives and visualisation components for:

- Stacked area charts.
- Line charts with dashed previous-period comparisons.
- Columns and stacked columns.
- Donut charts.
- Horizontal bars.
- Dot plots for latency versus cost.
- Heatmaps by hour and weekday.
- Sparklines.
- Forecast charts with dashed projections.
- Latency waterfalls.
- Quota meters.

Visualisation requirements:

- Use navy for primary series.
- Use amber for emphasis and projections.
- Use grey-blue for comparisons.
- Use red only for limits and errors.
- Keep provider colours consistent across charts.
- Use non-scaling strokes where specified.
- Render axis labels as HTML where appropriate.
- Provide a vertical hover guide and a navy tooltip listing the relevant series.
- Make charts responsive.
- Provide accessible labels and meaningful alternatives.
- Pair each chart with the question it answers.

Do not fill pages with charts simply to make them appear data-rich. Do not create decorative visualisations with meaningless values.

### 3.9 Data Provenance and Quota Presentation

Use the provenance treatments defined in `design.md`:

- **Provider-reported:** Navy fill with shield indicator.
- **Observed:** Outline with eye indicator.
- **Estimated:** Dashed outline with target indicator.
- **Your limit:** Amber fill with sliders indicator.

These labels must be used consistently wherever relevant, not only in the Quotas window.

Quota meter rules:

- Navy below the warning threshold.
- Amber from warning to critical.
- Red at or above the critical threshold.
- Default warning threshold: 70%.
- Default critical threshold: 90%.

The thresholds must be configurable where the product specification allows it. Unknown limits must not be represented as known percentages.

### 3.10 Landing Page Motion

The landing page should use meaningful, restrained animation.

Implement appropriate treatments such as:

- Animated usage visualisations.
- Moving request or data indicators.
- Subtle product-state transitions.
- Animated quota and consumption displays.
- Scroll-triggered reveals.
- Interactive Proxy/SDK demonstrations.

Motion must communicate product behaviour rather than decorate empty space.

Avoid random floating objects, distracting parallax, generic AI effects, and excessive animation.

Respect reduced-motion preferences and ensure the page remains understandable when animation is disabled.

### 3.11 Demo Data and Prototype Rules

The static prototype uses fictional sample data.

During development:

- Clearly identify demo or sample data.
- Keep demo data separate from real account data.
- Do not label sample values as live or provider-reported.
- Do not use prototype interactions as evidence that backend functionality exists.
- Replace every preview-only action with a real operation or a clearly labelled unavailable state.
- Never silently substitute fictional values when a backend request fails.

## 4. Product Window Structure

Quotient consists of a public website, an onboarding experience, and an authenticated application.

### Public Website

**Window 1 — Landing Page**

Introduce Quotient, communicate its value, explain how it works, and guide visitors toward registration.

Follow the landing-page composition in `design.md`, including the left-aligned serif hero, animated navy flow diagram, counter strip, problem rows, Proxy/SDK diagram toggle, capability viewer, provider table, pricing section, CTA, and footer.

**Window 2 — Authentication**

Includes:

- Sign up.
- Login.
- Forgot password.
- Email verification.
- Continue with Google.
- Continue with Apple.

Follow the authentication composition in `design.md`, including the underlined-field form, sign-in/create-account tabs, validation, OAuth actions, verification code entry where applicable, and the navy live-request-tape side panel.

### Initial Onboarding

**Window 3 — Workspace Setup**

Create a personal or team workspace and configure its initial details.

**Window 4 — Connect Your First AI Provider**

Connect a provider account and securely configure its credentials.

Initial providers:

- Gemini.
- OpenAI.
- Groq.
- Anthropic.
- OpenRouter.
- Custom OpenAI-compatible providers.

**Window 5 — Application Setup**

Create an application, define its type, and configure its environments.

**Window 6 — Integration Setup**

Choose between:

- API Proxy.
- SDK / Middleware.

Provide the required configuration, integration credentials, installation instructions, and verification process.

Windows 3–6 use the navy vertical progress track with dotted connector and fixed footer containing Previous, Skip for now, and Continue.

**Window 7 — Initial Dashboard / Overview**

Display the user's workspace overview and guide them toward completing any remaining configuration.

Users must be allowed to defer optional setup steps. Empty states should explain what is missing and how to complete it.

### Authenticated Application

**Monitor**

- Window 7 — Overview.
- Window 8 — Analytics.
- Window 9 — Quotas.
- Window 10 — Request Explorer.
- Window 11 — Insights.

**Manage**

- Window 12 — Providers.
- Window 13 — Applications.
- Window 14 — Integrations.
- Window 15 — Alerts.

**Workspace**

- Window 16 — Team.
- Window 17 — Settings.

All authenticated windows must use the persistent navigation structure from `design.md`.

Not every user must follow all 17 windows sequentially. Onboarding is primarily for new users, while the remaining windows are persistent product sections.

Detailed window behaviour and interactions are defined in `product-specification.md`.

## 5. Recommended Technology Stack

### Frontend

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Custom SVG visualisation components.
- Reusable component architecture.
- CSS and/or a suitable motion solution for purposeful animations.
- React Router or an equivalent routing solution.
- A data-fetching and caching solution where appropriate.

Do not add Recharts or another charting library. The visualisation implementation must follow the custom SVG approach in `design.md`.

### Backend

- Python.
- FastAPI.
- PostgreSQL.
- Redis.
- Background processing with Celery or an equivalent solution.
- WebSockets where real-time updates are required.

### Infrastructure

- Docker.
- Environment-based configuration.
- Secure secret management.
- Database migrations.
- Automated testing.
- Production-ready deployment architecture.

The final implementation should use stable, maintained libraries and avoid unnecessary dependencies. See `architecture.md` for the technical responsibilities and service boundaries.

## 6. Development Phases

Development will proceed through the following phases.

### Phase 1 — Project Foundation

Tasks:

- Establish the repository structure.
- Initialize the frontend.
- Initialize the backend.
- Configure environment variables.
- Establish frontend-backend communication.
- Configure PostgreSQL.
- Configure Redis.
- Set up database migrations.
- Establish linting and formatting.
- Configure automated testing.
- Create the shared design tokens.
- Load and configure Instrument Serif, Instrument Sans, and IBM Plex Mono.
- Establish the custom SVG visualisation foundation.
- Implement reusable UI primitives.

Deliverable: A working application foundation with the approved design system available to all windows.

### Phase 2 — Design System and Application Shell

Tasks:

- Implement the exact colour tokens and supporting tints from `design.md`.
- Define typography scale, weights, and line heights.
- Implement spacing, borders, surfaces, and component states.
- Build buttons, inputs, dialogs, tabs, tables, badges, meters, drawers, and toasts.
- Implement the 46px navy status strip.
- Implement the sticky white Monitor / Manage / Workspace section bar.
- Implement active navigation states.
- Implement workspace and environment selectors.
- Implement the responsive bottom navigation.
- Implement the `Ctrl K` jump palette.
- Implement the Window nn/17 navigation utility where required.
- Establish responsive layouts and breakpoints.
- Create shared public and authenticated layouts.
- Create loading, error, empty, success, and disabled states.
- Implement the onboarding progress track and fixed footer.

Deliverable: A complete, responsive application shell that matches the approved design and is ready for individual windows.

### Phase 3 — Public Website and Authentication

Tasks:

- Implement Window 1 according to its composition in `design.md`.
- Build the left-aligned serif hero.
- Implement the animated navy request-flow visual.
- Implement the counter strip and problem rows.
- Implement the Proxy/SDK demonstration toggle.
- Implement the capability viewer and provider table.
- Implement the pricing section.
- Implement CTA and footer navigation.
- Add accessible landing-page animations.
- Implement Window 2 according to its authentication composition.
- Add sign-up and login tabs.
- Implement email/password authentication.
- Implement Google authentication.
- Implement Apple authentication.
- Add password recovery.
- Add email verification.
- Implement the live request-tape visual as a presentation element, clearly distinguished from actual authenticated usage.
- Implement session management and authentication security.

Deliverable: A functioning public website and authentication system with the approved compositions.

### Phase 4 — Workspace and Onboarding

Tasks:

- Implement Window 3.
- Implement workspace creation.
- Add workspace ownership and membership.
- Implement the live workspace preview.
- Implement Window 4.
- Build provider credential management.
- Implement provider verification.
- Implement Window 5.
- Add application creation.
- Implement environments.
- Implement Window 6.
- Build API Proxy configuration.
- Build SDK/Middleware configuration.
- Add integration verification.
- Implement the onboarding progress track.
- Implement Previous, Skip for now, and Continue behaviour.
- Implement onboarding completion and deferred setup states.

Deliverable: Users can create a workspace, connect providers, configure applications, and prepare integrations.

### Phase 5 — Core Usage Collection and API Proxy

Tasks:

- Design the normalized usage event schema.
- Implement the API Proxy request lifecycle.
- Implement provider forwarding.
- Support provider authentication.
- Preserve streaming responses.
- Collect request metadata.
- Collect token usage where available.
- Capture latency and response status.
- Handle provider errors.
- Implement retry and timeout behaviour.
- Implement request deduplication.
- Add secure integration authentication.
- Implement usage event persistence.
- Record data provenance and timestamps.

Deliverable: Quotient can collect actual usage from requests routed through its supported Proxy.

### Phase 6 — Quota Calculation Engine

Tasks:

- Implement provider-specific quota models.
- Support fixed, rolling, and provider-defined windows where applicable.
- Process provider-reported usage and limits.
- Calculate locally observed usage.
- Support custom user-defined limits.
- Implement quota thresholds.
- Calculate quota health.
- Implement usage forecasting only where sufficient history exists.
- Handle unknown or unavailable quota information.
- Preserve source and confidence information.
- Implement the visual states and provenance badges specified in `design.md`.

Deliverable: A reliable quota calculation and monitoring engine that does not invent missing information.

### Phase 7 — Overview and Analytics

Tasks:

- Implement Window 7.
- Connect dashboard metrics to actual data.
- Implement meaningful no-data and partial-configuration states.
- Implement Window 8.
- Build usage aggregation.
- Implement custom SVG time-series visualisations.
- Add provider and application comparisons.
- Add cost and token analysis where data is available.
- Implement performance metrics.
- Add filters and data exports.
- Implement accessible chart tooltips and responsive visualisations.

Deliverable: Users can monitor actual API usage and analyse consumption through the approved visual system.

### Phase 8 — Quotas and Request Explorer

Tasks:

- Complete Window 9.
- Display provider-reported and user-configured limits separately.
- Implement quota meters and threshold markers.
- Implement supported enforcement controls.
- Implement Window 10.
- Build searchable request records.
- Add request filtering.
- Implement individual request details in the specified drawer.
- Capture request lifecycle information.
- Add error analysis.
- Add latency and token details.
- Add related request navigation.
- Implement secure data retention and redaction.

Deliverable: Users can understand quota state and investigate individual API requests.

### Phase 9 — SDK and Middleware

Tasks:

- Develop the Python SDK.
- Develop the JavaScript/TypeScript SDK.
- Implement middleware integration.
- Add secure integration authentication.
- Implement usage reporting.
- Add request metadata collection.
- Handle retries and duplicate events.
- Add integration examples and documentation.
- Verify actual usage events.

Deliverable: Developers can instrument their applications without routing all requests through the Quotient Proxy.

### Phase 10 — Insights and Alerts

Tasks:

- Implement Window 11.
- Build evidence-based usage anomaly detection.
- Implement quota exhaustion predictions where justified.
- Add cost optimization insights where data supports them.
- Add performance insights.
- Display evidence, confidence, and time range for findings.
- Implement Window 15.
- Build configurable alert rules.
- Implement alert evaluation.
- Add in-app notifications.
- Add email notifications.
- Add webhook delivery.
- Add delivery history, deduplication, cooldowns, and retry handling.

Deliverable: Users can receive useful, evidence-based insights and reliable notifications.

### Phase 11 — Provider, Application, and Integration Management

Tasks:

- Implement Window 12.
- Support multiple provider connections.
- Add provider health and connection status.
- Implement Window 13.
- Build application management.
- Add environment management.
- Implement provider associations.
- Implement Window 14.
- Build integration management.
- Add integration diagnostics.
- Add configuration management.
- Add key rotation and revocation.
- Reuse the integration setup flow established in Window 6 rather than creating a duplicate setup experience.

Deliverable: Users can manage their providers, applications, environments, and integrations.

### Phase 12 — Team Management and Settings

Tasks:

- Implement Window 16.
- Add invitations.
- Implement Owner, Admin, Developer, Analyst, and Viewer roles.
- Enforce role-based permissions on the backend.
- Add ownership transfer.
- Implement Window 17.
- Add profile settings.
- Add workspace settings.
- Add security settings.
- Add notification preferences.
- Add API and developer settings.
- Add data and privacy controls.
- Add billing settings only when billing is implemented.

Deliverable: Teams can manage access and configure their workspace.

### Phase 13 — Production Readiness

Tasks:

- Review application security.
- Review workspace isolation.
- Validate authorization on every protected operation.
- Test API Proxy reliability.
- Test SDK reporting.
- Test quota calculations.
- Test alert delivery.
- Optimize database queries.
- Add caching where appropriate.
- Add logging and monitoring.
- Add rate limiting.
- Test concurrent usage events.
- Implement backup and recovery procedures.
- Test failure scenarios.
- Configure production deployment.
- Verify responsive layouts and accessibility.
- Verify reduced-motion behaviour.
- Prepare technical documentation.

Deliverable: A tested, secure, accessible, and deployable product.

## 7. Important Technical Rules

### Usage Collection

Quotient must not claim to monitor requests that it cannot observe.

- API Proxy requests are observable because they pass through Quotient.
- SDK/Middleware requests are observable only when properly instrumented and reported.
- Connecting a provider account does not automatically reveal usage from unrelated applications.
- Requests made outside Quotient's supported integration paths may not be visible.
- Provider usage endpoints may provide additional account-level information where supported, but must be identified as a separate data source.

### Data Accuracy

Every usage value must have a clear source.

Distinguish between:

- Provider-reported values.
- Quotient-observed values.
- User-configured limits.
- Estimates and forecasts.

Never invent exact quota values, reset times, token consumption, costs, or provider capabilities.

### Security

- Encrypt provider credentials at rest.
- Never expose stored provider secrets in frontend responses.
- Hash integration authentication keys.
- Enforce workspace isolation.
- Apply server-side authorization.
- Protect custom provider endpoints against SSRF.
- Avoid storing raw prompts and responses by default.
- Redact sensitive information.
- Maintain audit logs for important actions.

### Prototype and Demo Data

- Treat `quotient-preview.html` as a visual reference, not a working implementation.
- Clearly label all fictional sample data.
- Do not mix demo records with real workspace records.
- Do not use sample data to imply a provider is connected or an integration has been verified.
- Never silently replace failed API responses with demo metrics.

## 8. Development Workflow

Use a feature-based vertical-slice workflow.

For each feature:

1. Understand the feature requirements.
2. Review the corresponding window specification in `product-specification.md`.
3. Review relevant visual rules in `design.md`.
4. Identify the required frontend components.
5. Identify backend endpoints and data models.
6. Implement the backend logic.
7. Implement the frontend interface.
8. Connect the frontend to the backend.
9. Test the complete feature.
10. Fix errors and verify edge cases.
11. Update documentation.
12. Commit the completed work.
13. Move to the next feature.

Do not build every frontend screen first and leave all functionality for later.

Likewise, do not build the entire backend without considering how the frontend will consume it.

Each vertical slice should result in a usable, tested part of the product.

## 9. Frontend Implementation Rules

- Follow `design.md` as the visual source of truth.
- Do not replace the established design direction with generic SaaS templates.
- Use Instrument Serif, Instrument Sans, and IBM Plex Mono in their specified roles.
- Use the exact palette tokens and supporting tints.
- Implement the navy status strip and three-group section bar.
- Do not introduce a conventional fixed sidebar.
- Keep navigation consistent but allow different pages to use layouts suited to their content.
- Reuse components where appropriate without making every page look identical.
- Use custom SVG for data visualisations; do not introduce a chart library.
- Use meaningful charts and visualisations.
- Make tables readable and useful.
- Apply the defined provenance badges consistently.
- Include proper loading, error, empty, and success states.
- Make every visible control perform its intended action.
- Ensure responsive behaviour.
- Keep accessibility in mind.
- Respect reduced-motion preferences.
- Avoid unnecessary animations outside the landing page and meaningful interaction states.
- Never sacrifice usability for visual experimentation.
- Never show demo data as live workspace data.

## 10. Backend Implementation Rules

- Use modular services and clear API boundaries.
- Validate all incoming data.
- Implement consistent error responses.
- Use database transactions where necessary.
- Handle concurrent usage events safely.
- Use background processing for suitable asynchronous tasks.
- Implement authentication and authorization centrally.
- Maintain clear separation between provider-specific and provider-independent logic.
- Avoid duplicating business logic across endpoints.
- Document API endpoints.
- Add automated tests for critical operations.
- Preserve provenance and timestamps for usage and quota data.
- Ensure the backend, not the frontend, calculates authoritative usage and quota values.

## 11. Testing Strategy

Testing must happen throughout development.

### Frontend Testing

- Component rendering.
- Form validation.
- Navigation and active states.
- Keyboard navigation and jump palette.
- Responsive layouts.
- Interaction behaviour.
- Loading and error states.
- Empty and partial-configuration states.
- Accessibility.
- SVG visualisation rendering and tooltips.
- Reduced-motion behaviour.
- Consistency with the design system.

### Backend Testing

- API endpoint testing.
- Authentication and authorization.
- Database operations.
- Provider integrations.
- Usage event processing.
- Quota calculations.
- Alert evaluation.
- Error handling.
- Idempotency and concurrency.
- Secret handling and redaction.
- Workspace isolation.

### Integration Testing

- Complete onboarding flow.
- Provider connection and verification.
- Application creation.
- API Proxy request forwarding.
- Streaming responses.
- SDK usage reporting.
- Dashboard data accuracy.
- Quota updates.
- Alert generation and delivery.
- Team permissions.
- Cross-window navigation and context.

### Production Testing

- Performance.
- Concurrent requests.
- Security.
- Failure recovery.
- Data consistency.
- Deployment behaviour.
- Backup and restore.
- Monitoring and logging.

## 12. Documentation Structure

Maintain documentation as the project develops.

Primary project files:

- `README.md` — Project overview and setup instructions.
- `idea.md` — Product concept and requirements.
- `planning.md` — Development roadmap and workflow.
- `architecture.md` — Technical architecture.
- `design.md` — Visual identity and UI guidelines.
- `product-specification.md` — The 17 windows and complete user journey.

Additional technical documentation may include:

- `database.md` — Database structure.
- `api.md` — Backend API documentation.
- `security.md` — Security and privacy decisions.
- `CHANGELOG.md` — Important changes.
- `docs/` — SDK, API Proxy, and integration documentation.

Do not create a second competing design-system document unless it is explicitly maintained as a generated or implementation-specific reference derived from `design.md`.

## 13. Completion Criteria

A feature is complete only when:

- Its requirements have been implemented.
- Its UI follows `design.md`.
- Its backend logic works where required.
- Its frontend is connected to real functionality.
- Its data is accurate and its provenance is clear.
- Its loading, error, and empty states are handled.
- Its responsive behaviour is verified.
- Its security requirements are satisfied.
- Its tests pass.
- Its documentation is updated.

A visually complete screen is not necessarily a completed feature.

A feature must work as intended before it is considered finished.

## 14. Final Development Goal

The goal is to build Quotient as a complete, reliable, visually distinctive, and production-ready AI API monitoring and quota management platform.

The final product should combine:

- A recognizable and intentional visual identity.
- The precise technical-instrumentation design direction.
- A consistent navy status strip and Monitor / Manage / Workspace navigation.
- Accurate API usage monitoring.
- Reliable quota management.
- Multiple provider integrations.
- API Proxy and SDK/Middleware support.
- Detailed analytics and request observability.
- Evidence-based intelligence.
- Configurable alerts.
- Secure workspace and team management.
- A responsive, accessible interface.

Every development decision should support these goals.

**Build Quotient as a real product, not merely a collection of attractive screens.**