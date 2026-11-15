# Quotient — System Architecture

## 1. Architecture Overview

Quotient is a provider-independent AI API observability and quota management platform.

It collects AI API usage data through two integration methods:

1. **API Proxy:** Applications send supported AI API requests through Quotient. Quotient forwards those requests to the original AI provider while collecting observable usage and request metadata.
2. **SDK / Middleware:** Applications integrate Quotient's SDK or middleware to report instrumented usage and request metadata without routing their AI traffic through Quotient.

The collected data is processed, normalized, stored, aggregated, and used to power monitoring, analytics, quota tracking, alerts, and intelligent insights.

### High-Level Architecture

The system consists of these main layers:

1. Frontend Application.
2. Backend API.
3. Authentication and Authorization.
4. Workspace and Application Management.
5. Provider Integration Layer.
6. API Proxy Layer.
7. SDK and Middleware Layer.
8. Usage Collection and Processing Engine.
9. Quota Management Engine.
10. Analytics and Insights Engine.
11. Alert and Notification Engine.
12. Database and Cache Layer.
13. Background Processing Layer.
14. Real-Time Communication Layer.

### Architecture Principles

- Modular and maintainable architecture.
- Clear separation of frontend and backend responsibilities.
- Provider-independent usage processing.
- Support for both Proxy and SDK integrations.
- Accurate usage tracking with explicit data sources.
- Secure handling of provider credentials and integration keys.
- Workspace-level data isolation.
- Scalable request processing.
- No fabricated usage, quota, cost, or forecast information.
- API-first backend design.
- Backend-authoritative calculations and permissions.
- A frontend design system that follows `design.md`.
- Distinct page compositions without duplicating business logic.

## 2. Technology Stack

### Frontend

| Technology | Responsibility |
|---|---|
| React | UI development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling and layout utilities |
| Custom SVG | Charts and data visualisation |
| React Router | Application navigation |
| TanStack Query or equivalent | API data fetching and caching |
| WebSocket client | Real-time updates where needed |

**Visualisation decision:** Quotient uses custom SVG visualisations. Do not introduce Recharts or another chart library. The SVG components must follow the chart types, colours, tooltip behaviour, and visual rules in `design.md`.

### Backend

| Technology | Responsibility |
|---|---|
| Python | Backend programming |
| FastAPI | REST API and application server |
| Pydantic | Request validation and schemas |
| SQLAlchemy | Database ORM |
| Alembic | Database migrations |
| PostgreSQL | Persistent relational storage |
| Redis | Caching, counters, and temporary data |
| Celery or equivalent | Background processing |
| WebSockets | Real-time communication |

### Infrastructure and Development

- Docker for containerization.
- Docker Compose for local development.
- PostgreSQL for persistent data.
- Redis for caching and background task coordination.
- Git and GitHub for version control.
- Environment variables for configuration.
- OpenAPI documentation through FastAPI.
- Automated testing through pytest and frontend testing tools.

The exact hosting and deployment providers can be selected during production preparation.

## 3. System Architecture Diagram

```text
                              QUOTIENT
                                  |
                 +----------------+----------------+
                 |                                 |
           FRONTEND APP                       EXTERNAL APPS
           React + TypeScript                       |
                 |                     +-----------+-----------+
                 |                     |                       |
                 |                 API PROXY                SDK / MW
                 |                     |                       |
                 +---------------------+-----------------------+
                                       |
                                BACKEND SERVICES
                                       |
          +----------------------------+----------------------------+
          |                            |                            |
   Authentication                Provider Layer                 Usage API
          |                            |                            |
          +----------------------------+----------------------------+
                                       |
                            Usage Processing Engine
                                       |
                    +------------------+------------------+
                    |                  |                  |
                PostgreSQL           Redis          Background Jobs
                    |                  |                  |
                    +------------------+------------------+
                                       |
                     +-----------------+-----------------+
                     |                 |                 |
                Quota Engine       Analytics         Alert Engine
                     |              Engine                |
                     +-----------------+-----------------+
                                       |
                                 Insights Engine
                                       |
                                Frontend Dashboard
```

This diagram represents the logical architecture. Individual modules may initially run inside the same FastAPI application and be separated later if scaling requires it.

## 4. Frontend Architecture

The frontend is responsible for presenting Quotient's interface and allowing users to interact with its features.

It does not independently calculate authoritative usage, quota, permission, or billing values. These calculations belong to the backend.

### 4.1 Main Frontend Structure

```text
frontend/
│
├── public/
│   ├── fonts/
│   │   ├── instrument-serif/
│   │   ├── instrument-sans/
│   │   └── ibm-plex-mono/
│   └── assets/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── providers.tsx
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── StatusStrip.tsx
│   │   │   ├── SectionBar.tsx
│   │   │   ├── MobileBottomNav.tsx
│   │   │   ├── WorkspaceSwitcher.tsx
│   │   │   ├── EnvironmentSwitcher.tsx
│   │   │   ├── JumpPalette.tsx
│   │   │   └── WindowMap.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── primitives/
│   │   │   ├── axes/
│   │   │   ├── tooltips/
│   │   │   ├── area/
│   │   │   ├── line/
│   │   │   ├── bars/
│   │   │   ├── donut/
│   │   │   ├── heatmap/
│   │   │   ├── sparklines/
│   │   │   ├── forecast/
│   │   │   ├── waterfall/
│   │   │   └── quota-meter/
│   │   │
│   │   ├── tables/
│   │   ├── forms/
│   │   ├── dialogs/
│   │   ├── drawers/
│   │   ├── badges/
│   │   ├── timelines/
│   │   ├── code/
│   │   └── common/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── AppLayout.tsx
│   │   └── OnboardingLayout.tsx
│   │
│   ├── pages/
│   │   ├── landing/
│   │   ├── authentication/
│   │   ├── onboarding/
│   │   ├── overview/
│   │   ├── analytics/
│   │   ├── quotas/
│   │   ├── requests/
│   │   ├── insights/
│   │   ├── providers/
│   │   ├── applications/
│   │   ├── integrations/
│   │   ├── alerts/
│   │   ├── team/
│   │   └── settings/
│   │
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── types/
│   ├── utils/
│   ├── design-system/
│   │   ├── tokens/
│   │   ├── typography/
│   │   ├── components/
│   │   └── responsive/
│   │
│   └── styles/
│       ├── globals.css
│       ├── fonts.css
│       └── motion.css
│
└── package.json
```

This is a proposed organization. Modules should be introduced as their corresponding features are implemented.

### 4.2 Frontend Responsibilities

- Display the 17 product windows.
- Handle navigation and route protection.
- Render the navy status strip and section navigation.
- Manage authentication state.
- Manage active workspace and environment selection.
- Fetch and display backend data.
- Submit forms and configuration changes.
- Display loading, success, error, and empty states.
- Render custom SVG charts and usage visualisations.
- Display data provenance.
- Receive real-time updates where implemented.
- Handle responsive layouts and accessibility.
- Respect reduced-motion preferences.

### 4.3 Design System Architecture

The frontend must implement the visual system defined in `design.md`.

#### Typography

Load and use the specified fonts:

- Instrument Serif for display typography, page titles, and large metrics.
- Instrument Sans for interface and body text.
- IBM Plex Mono for technical information, identifiers, endpoints, code, logs, and tabular labels.

Font loading must be efficient and include appropriate fallbacks.

#### Colour Tokens

Centralize the approved design tokens rather than hardcoding unrelated colours across components.

Core tokens:

```css
:root {
  --navy: #14213D;
  --amber: #FCA311;
  --white: #FFFFFF;
  --line: #E5E5E5;
  --black: #000000;
}
```

Supporting tints and functional status colours must follow `design.md`.

#### Layout and Responsive Behaviour

Implement the page width, spacing, radii, and responsive breakpoints defined in `design.md`.

The application must support:

- Desktop status strip and section bar.
- Responsive two-column and single-column compositions.
- Fixed horizontally scrollable bottom navigation at the specified mobile breakpoint.
- Appropriate mobile forms, tables, drawers, and dialogs.

#### Navigation Components

The authenticated layout contains:

1. A navy status strip with workspace and environment context, available live indicators, alerts, and profile access.
2. A sticky white section bar divided into Monitor, Manage, and Workspace.
3. A responsive bottom navigation for smaller screens.
4. A keyboard-accessible `Ctrl K` jump palette.
5. The Window nn/17 navigation utility where implemented.

The navigation must not be replaced with a conventional fixed sidebar.

#### Data Provenance Components

Reusable provenance indicators must distinguish:

- Provider-reported values.
- Quotient-observed values.
- Estimated values.
- User-configured limits.

The backend supplies the provenance metadata. The frontend renders the appropriate visual treatment.

### 4.4 Custom SVG Visualisation Architecture

Quotient uses custom SVG rather than a charting library.

Create reusable visualisation primitives for:

- Scales and coordinate calculations.
- SVG paths and shapes.
- Axes and tick marks.
- Grid lines.
- Data points.
- Hover guides.
- Tooltips.
- Legends.
- Responsive view boxes.
- Accessible descriptions.

Build higher-level chart components from these primitives:

- Stacked area.
- Line and comparison line.
- Columns and stacked columns.
- Donut.
- Horizontal bars.
- Dot plot.
- Heatmap.
- Sparkline.
- Forecast.
- Latency waterfall.
- Quota meter.

Visual rules:

- Navy is the primary series colour.
- Amber is used for emphasis and forecasts.
- Grey-blue is used for comparison.
- Red is reserved for errors and limit states.
- Provider colours must remain consistent across charts.
- Hover interactions use a vertical guide and a navy tooltip.
- Axis labels should remain readable at all supported widths.
- Charts must have accessible descriptions and useful non-visual context.

Do not render a chart with meaningless placeholder values in a live workspace. When there is no data, render a proper empty state.

### 4.5 Frontend Rules

- All product data must come from backend APIs.
- Do not hardcode sample metrics as actual account data.
- Use reusable components where they provide genuine consistency.
- Avoid one generic page template for every product window.
- Keep page-specific layouts appropriate to their content.
- Implement proper loading, error, empty, and success states.
- Do not expose provider credentials or secret integration keys.
- Keep UI state separate from authoritative backend state.
- Clearly label estimates and sample information.
- Keep every visible control connected to its intended action.

## 5. Backend Architecture

FastAPI is responsible for application logic, API endpoints, authentication, usage processing, quota calculations, and communication with external providers.

The backend should follow a modular structure.

### 5.1 Suggested Backend Structure

```text
backend/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── workspaces.py
│   │   │   ├── members.py
│   │   │   ├── providers.py
│   │   │   ├── applications.py
│   │   │   ├── integrations.py
│   │   │   ├── proxy.py
│   │   │   ├── usage.py
│   │   │   ├── quotas.py
│   │   │   ├── analytics.py
│   │   │   ├── requests.py
│   │   │   ├── insights.py
│   │   │   ├── alerts.py
│   │   │   └── settings.py
│   │   │
│   │   └── dependencies/
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── permissions.py
│   │   ├── encryption.py
│   │   └── exceptions.py
│   │
│   ├── models/
│   ├── schemas/
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── workspace_service.py
│   │   ├── provider_service.py
│   │   ├── application_service.py
│   │   ├── integration_service.py
│   │   ├── usage_service.py
│   │   ├── quota_service.py
│   │   ├── analytics_service.py
│   │   ├── alert_service.py
│   │   └── insight_service.py
│   │
│   ├── providers/
│   │   ├── base.py
│   │   ├── openai.py
│   │   ├── anthropic.py
│   │   ├── gemini.py
│   │   ├── groq.py
│   │   ├── openrouter.py
│   │   └── custom.py
│   │
│   ├── proxy/
│   │   ├── handler.py
│   │   ├── forwarding.py
│   │   ├── streaming.py
│   │   └── error_handling.py
│   │
│   ├── ingestion/
│   │   ├── sdk_events.py
│   │   ├── validation.py
│   │   └── normalization.py
│   │
│   ├── workers/
│   │   ├── tasks.py
│   │   ├── aggregation.py
│   │   ├── alerts.py
│   │   └── insights.py
│   │
│   ├── db/
│   │   ├── session.py
│   │   └── base.py
│   │
│   └── utils/
│
├── migrations/
├── tests/
├── alembic.ini
├── requirements.txt
└── Dockerfile
```

This is the proposed organization, not a requirement to create every file immediately. Modules should be introduced as their corresponding features are implemented.

### 5.2 Backend Responsibilities

- Authenticate users.
- Enforce workspace permissions.
- Manage providers and applications.
- Issue and validate integration keys.
- Receive usage events.
- Forward supported Proxy requests.
- Normalize provider-specific information.
- Persist request and usage records.
- Calculate quotas.
- Aggregate historical usage.
- Evaluate alert rules.
- Generate evidence-based insights.
- Expose analytics and request data.
- Publish authorized real-time events.
- Maintain audit records.

## 6. Authentication and Authorization

Authentication and authorization must be centralized.

### Authentication Methods

The system supports:

- Email and password.
- Google authentication.
- Apple authentication.
- Email verification where enabled.
- Password recovery.
- Secure session or token handling.

### Authorization

Every protected request must verify:

1. The user is authenticated.
2. The requested workspace exists.
3. The user belongs to the workspace.
4. The user's role permits the requested action.
5. The resource belongs to the authorized workspace.

Suggested workspace roles:

- Owner.
- Admin.
- Developer.
- Analyst.
- Viewer.

Permissions must be enforced by backend services and route dependencies. Frontend visibility rules are only a usability feature, not a security boundary.

## 7. Workspace and Application Management

Workspaces are the primary ownership boundary for Quotient resources.

A workspace can contain:

- Members.
- Provider connections.
- Applications.
- Environments.
- Integrations.
- Usage records.
- Quota configurations.
- Alerts.
- Insights.
- Audit logs.

Applications belong to one workspace and can contain multiple environments.

Each environment must have its own identity and appropriate integration configuration.

Every query involving workspace-owned resources must enforce workspace authorization.

## 8. Provider Integration Layer

Quotient must use a provider adapter architecture.

Each provider adapter is responsible for provider-specific behaviour, including:

- Authentication requirements.
- Base URL and endpoint configuration.
- Request forwarding compatibility.
- Response handling.
- Streaming behaviour.
- Usage extraction.
- Rate-limit header extraction.
- Error normalization.
- Model identification.
- Supported capability reporting.
- Provider usage endpoint access where available.

### Initial Providers

- Google Gemini.
- OpenAI.
- Groq.
- Anthropic.
- OpenRouter.
- Custom OpenAI-compatible endpoints.

### Provider Adapter Contract

A common provider interface should expose operations appropriate to the provider, such as:

- Validate or test a connection.
- Forward a supported request.
- Handle streaming responses.
- Extract usage metadata.
- Extract available quota and rate-limit information.
- Normalize provider errors.
- Retrieve supported model information where available.

Provider-specific information must not be discarded when normalized. Store original relevant metadata safely when needed for debugging and future compatibility.

### Custom Provider Security

Custom endpoints must be protected against SSRF.

Validate destinations and block private, loopback, link-local, and otherwise prohibited network destinations. Revalidate after DNS resolution and redirects. Do not allow custom endpoint configuration to expose internal services.

## 9. API Proxy Architecture

The API Proxy receives supported AI API requests from external applications and forwards them to the configured provider.

### Request Lifecycle

```text
External Application
        |
        v
Quotient Proxy Endpoint
        |
        v
Validate Integration Key
        |
        v
Resolve Workspace / App / Environment
        |
        v
Resolve Provider Connection
        |
        v
Validate Routing and Permissions
        |
        v
Forward Request to Provider
        |
        v
Receive Provider Response
        |
        +--------------------------+
        |                          |
        v                          v
Extract Usage / Headers       Stream or Return Response
        |
        v
Create Request and Usage Records
        |
        v
Persist and Publish Events
```

### Proxy Requirements

- Preserve supported provider request formats.
- Preserve streaming responses.
- Preserve relevant response headers.
- Handle timeouts.
- Handle provider errors distinctly from Proxy errors.
- Avoid logging credentials or sensitive request content.
- Apply request size and rate limits.
- Support safe retries only where appropriate.
- Use idempotency to prevent duplicate usage records.
- Minimize additional latency.
- Avoid changing provider response semantics unnecessarily.

The Proxy must not claim support for provider endpoints or features that have not been implemented and tested.

## 10. SDK and Middleware Architecture

The SDK/Middleware integration reports usage information from instrumented applications.

The application may continue making its provider requests directly. Quotient receives separate usage events from the SDK.

### SDK Responsibilities

- Identify the Quotient workspace, application, environment, and integration.
- Submit authenticated usage events.
- Include provider and model identifiers.
- Include token counts when available.
- Include request status and timing when available.
- Include a unique event or request identifier.
- Retry transient reporting failures safely.
- Prevent duplicate event counting.
- Avoid sending raw prompts and completions by default.

### Initial SDK Targets

- Python.
- JavaScript/TypeScript.

### SDK Data Flow

```text
Application
    |
    +-----------------------> AI Provider
    |                              |
    |                              v
    |                       Provider Response
    |                              |
    v                              |
Quotient SDK / Middleware <--------+
    |
    v
Usage Event
    |
    v
Quotient Ingestion API
    |
    v
Validate and Normalize
    |
    v
Persist Usage Event
```

SDK reporting must not interfere with the application's primary provider request. If reporting fails, the SDK should follow the documented failure policy and avoid unnecessarily breaking the application.

The SDK must not claim visibility into requests that are not instrumented.

## 11. Usage Collection and Normalization Engine

The Usage Collection Engine receives usage information from:

- API Proxy requests.
- SDK/Middleware events.
- Supported provider usage endpoints.

### Normalized Usage Event

A normalized event may contain:

- Event ID.
- Request ID.
- Workspace ID.
- Application ID.
- Environment ID.
- Integration ID.
- Provider ID.
- Model identifier.
- Integration source.
- Timestamp.
- Request status.
- Input token count, if available.
- Output token count, if available.
- Total token count, if available.
- Latency, if available.
- Cost and pricing source, if available.
- Provider-reported metadata.
- Observed rate-limit headers.
- Data provenance.

Optional values must remain absent or unknown when they cannot be obtained reliably.

### Processing Flow

```text
Proxy / SDK / Provider Usage Source
                |
                v
         Usage Ingestion
                |
                v
       Authentication Check
                |
                v
        Schema Validation
                |
                v
       Idempotency Check
                |
                v
      Provider Normalization
                |
                v
        Usage Persistence
                |
                v
        Event Publication
          /           \
         v             v
    Aggregation     Quota Engine
```

### Data Accuracy

- Do not assume every provider reports token usage in the same way.
- Preserve provider-specific metadata where necessary.
- Do not calculate exact cost without reliable pricing information.
- Identify the source of every quota value.
- Distinguish provider-reported values from locally observed counts.
- Keep timestamps and data freshness visible.
- Do not double-count events from retries or duplicate submissions.

## 12. Quota Management Engine

The Quota Engine calculates and tracks usage against provider-imposed and user-configured limits.

### Quota Categories

1. Provider-reported limits.
2. Locally observed usage against a known limit.
3. User-configured limits.
4. Estimated remaining capacity or exhaustion time.

### Quota Information

A quota record may contain:

- Provider or custom limit source.
- Provider connection.
- Model, where applicable.
- Metric type.
- Limit value.
- Observed or reported consumption.
- Window type.
- Window start and end, where known.
- Reset timestamp, where known.
- Last updated timestamp.
- Provenance.
- Confidence or availability status.

### Supported Window Types

Where supported by the provider or user configuration:

- Fixed windows.
- Rolling windows.
- Provider-defined windows.
- Model-specific windows.
- User-configured windows.

Do not assume that all providers use the same reset logic.

### Quota Processing

```text
Usage / Provider Limit Update
             |
             v
       Identify Quota
             |
             v
      Resolve Window
             |
             v
      Update Consumption
             |
             v
     Calculate Remaining
             |
             v
    Evaluate Thresholds
             |
             v
      Store Snapshot
             |
             v
   Publish Quota State
```

### Enforcement

Enforcement can only be guaranteed for requests that pass through a supported Quotient Proxy path or another explicitly implemented enforcement mechanism.

SDK reporting alone does not allow Quotient to block a provider request that has already been sent directly by the application.

## 13. Analytics Architecture

The Analytics Engine provides historical and comparative usage information.

### Processing Flow

```text
Usage Events and Request Records
              |
              v
        Aggregation Jobs
              |
              v
      Time-Based Aggregates
              |
              v
 Provider / Model / App Grouping
              |
              v
          Analytics API
              |
              v
     Frontend SVG Visualisations
```

### Aggregation Dimensions

Usage may be grouped by:

- Time period.
- Provider.
- Model.
- Application.
- Environment.
- Integration.
- Request status.

### Time Intervals

Depending on the selected time range, the system may aggregate usage by:

- Minute.
- Hour.
- Day.
- Month.

The backend should select suitable aggregation intervals instead of loading every raw request for every chart.

### Data Integrity

Analytics must be derived from actual stored records and clearly identified estimates.

If data is incomplete, stale, or unavailable, the frontend should communicate that limitation.

### Frontend Visualisation Contract

The backend supplies structured data, not pre-rendered charts.

The frontend uses custom SVG components defined in `design.md` to display:

- Stacked area charts.
- Line charts and previous-period comparisons.
- Column charts.
- Donut charts.
- Horizontal bars.
- Dot plots.
- Heatmaps.
- Sparklines.
- Forecast charts.
- Latency waterfalls.
- Quota meters.

The frontend must not independently invent missing values to complete a chart.

## 14. Request Explorer Architecture

The Request Explorer provides detailed visibility into individual AI API requests.

It uses request records created by the Proxy and SDK integrations.

### Request Record Information

- Request ID.
- Timestamp.
- Provider.
- Model.
- Application.
- Environment.
- Integration method.
- Request status.
- HTTP status.
- Latency.
- Token usage.
- Cost estimate, if available.
- Error information, if applicable.
- Available rate-limit metadata.
- Data source.

### Request Detail Flow

```text
User Opens Request Explorer
          |
          v
Frontend Requests Filtered Records
          |
          v
Backend Validates Workspace Access
          |
          v
Query Request Records
          |
          v
Apply Filters and Pagination
          |
          v
Return Request Information
          |
          v
User Opens Individual Request
          |
          v
Retrieve Detailed Request Metadata
```

Raw request and response payloads must not be stored by default.

If payload capture is introduced, it must be explicitly enabled, access-controlled, and protected through redaction and retention policies.

The frontend may display request details in the right-side drawer specified by `design.md`.

## 15. Alert and Notification Engine

The Alert Engine monitors quota thresholds and other configured conditions.

### Alert Sources

- User-defined quota thresholds.
- Provider-reported rate-limit events.
- Request failure rates.
- Unusual usage increases.
- Provider connection failures.
- Other supported monitoring conditions.

### Alert Processing

```text
Usage / Monitoring Event
          |
          v
Evaluate Alert Rules
          |
          v
Check Threshold and Conditions
          |
          v
Check Cooldown and Deduplication
          |
          v
Create Alert Event
          |
          v
Notification Dispatcher
          |
          +----------+-----------+
          |          |           |
          v          v           v
       In-App      Email      Webhook
```

### Alert Requirements

- Configurable thresholds.
- Alert severity.
- In-app notifications.
- Email notifications.
- Webhook notifications.
- Cooldown periods.
- Duplicate suppression.
- Delivery status tracking.
- Retry handling for failed delivery.
- Alert history.

Additional channels, such as Slack, should only be presented as available when their integration has actually been implemented.

## 16. Insights Engine

The Insights Engine analyzes historical usage data to identify useful patterns.

It may provide:

- Unusual usage increases.
- High-consumption applications.
- Model usage comparisons.
- Usage trends.
- Potential quota exhaustion.
- Spending trends where cost data is available.
- Forecasts based on historical consumption.
- Potential optimization opportunities.

### Insights Processing

```text
Historical Usage Data
          |
          v
Data Sufficiency Check
          |
          v
Statistical Analysis
          |
          v
Pattern / Anomaly Detection
          |
          v
Forecasting (When Appropriate)
          |
          v
Generate Insight
          |
          v
Store Insight and Evidence
          |
          v
Display Structured Finding
```

### Reliability Requirements

- Do not generate forecasts without sufficient historical data.
- Clearly distinguish predictions from observed facts.
- Include the time range and supporting evidence.
- Avoid presenting statistical anomalies as confirmed problems.
- Do not generate insights from missing or unreliable data.
- Explain why an insight was generated.
- Include confidence or uncertainty where meaningful.

Insights should be displayed as structured findings, not as a generic chatbot interface.

The initial implementation should prioritize reliable rule-based and statistical analysis before introducing more complex machine learning models.

## 17. Database Architecture

PostgreSQL is the primary relational database.

It stores user accounts, workspace information, provider connections, integrations, usage events, quota rules, alerts, and other persistent application data.

### Core Tables

| Table | Purpose |
|---|---|
| `users` | User accounts |
| `workspaces` | Workspace information |
| `workspace_members` | User-workspace relationships and roles |
| `providers` | Supported provider definitions |
| `provider_connections` | Workspace provider accounts and encrypted credentials |
| `applications` | Monitored applications |
| `environments` | Application environments |
| `integration_keys` | Hashed Proxy and SDK integration keys |
| `integrations` | Integration configurations |
| `api_requests` | Individual request records |
| `usage_events` | Normalized usage events |
| `quota_configs` | Provider and user-defined quota configurations |
| `quota_snapshots` | Historical quota consumption snapshots |
| `alerts` | Alert rule configurations |
| `alert_events` | Triggered alert records |
| `usage_aggregates` | Precomputed usage summaries |
| `insights` | Generated insights and supporting information |
| `audit_logs` | Important security and configuration actions |

### Key Relationships

```text
users
  |
  +---- workspace_members
              |
              v
          workspaces
              |
       +------+------+-----------+
       |             |           |
 applications   providers     members
       |
 environments
       |
 integrations
       |
 api_requests
       |
 usage_events
       |
 usage_aggregates
```

Additional relationships connect workspaces to provider connections, quota configurations, alerts, insights, and audit logs.

### Database Requirements

- Use UUIDs or another consistent unique identifier strategy.
- Enforce foreign-key relationships.
- Add indexes to frequently queried fields.
- Index workspace IDs and event timestamps for usage queries.
- Use appropriate uniqueness constraints.
- Use database migrations through Alembic.
- Apply workspace-level access checks in application services.
- Use transactions for operations requiring consistency.
- Define retention and archival policies for high-volume request data.

### Redis Responsibilities

Redis is used for:

- Frequently accessed cache data.
- Temporary usage counters.
- Atomic counter operations.
- Rate limiting.
- Background task coordination.
- Short-lived state.
- WebSocket or event coordination where appropriate.

Redis must not become the only storage location for confirmed historical usage.

## 18. Real-Time Communication

Quotient may use WebSockets to update the interface when important events occur.

Examples:

- New request activity.
- Updated usage totals.
- Quota threshold changes.
- Newly triggered alerts.
- Background job completion.

### Real-Time Flow

```text
Backend Event
     |
     v
Event Publisher
     |
     v
WebSocket Connection
     |
     v
Workspace Authorization
     |
     v
Frontend Update
```

WebSocket connections must be authenticated and scoped to the user's authorized workspace.

REST APIs remain the primary method for retrieving historical data and managing configurations.

Real-time updates should supplement REST APIs, not replace them.

## 19. Background Processing

Some operations should not run directly inside normal user-facing API requests.

Celery workers or an equivalent task system can handle background operations using Redis as the broker and coordination layer.

### Background Tasks

- Usage aggregation.
- Historical data processing.
- Alert evaluation.
- Notification delivery.
- Insight generation.
- Forecast generation.
- Periodic provider usage synchronization.
- Cleanup and retention jobs.

### Task Reliability

- Tasks should be safe to retry.
- Duplicate processing must be prevented where necessary.
- Failed tasks should be logged.
- Retry limits and backoff should be configured.
- Long-running tasks should not block API requests.

The API should return appropriate task status when an operation is asynchronous.

## 20. Security Architecture

Security must be implemented across all application layers.

### Authentication Security

- Secure password hashing.
- Secure session or token handling.
- OAuth state validation.
- Email verification.
- Password reset token expiration.
- Login rate limiting.
- Session revocation where supported.

### Provider Credential Security

Provider API keys are highly sensitive.

Requirements:

- Encrypt credentials before database storage.
- Use a managed secret or encryption key outside the database.
- Never return decrypted provider credentials to the frontend.
- Never expose credentials in application logs.
- Restrict decryption to the services that require it.
- Support credential rotation and deletion.

### Integration Key Security

- Generate cryptographically secure integration keys.
- Store only hashed integration keys.
- Display secret keys only when initially generated.
- Support revocation and regeneration.
- Associate keys with workspaces and integrations.
- Enforce appropriate permissions.

### Workspace Isolation

Every workspace-scoped operation must validate workspace membership and permissions.

A user must never be able to access another workspace's:

- Provider connections.
- Applications.
- Usage events.
- Request records.
- Quota configurations.
- Alerts.
- Team information.
- Insights.

### API Security

- Validate all incoming data.
- Use HTTPS in production.
- Apply rate limiting.
- Configure CORS correctly.
- Prevent SQL injection through safe database access.
- Protect against SSRF.
- Avoid exposing internal errors.
- Apply secure logging and redaction.

### SSRF Protection

Custom provider endpoints require particular protection.

The system must validate destinations and block private, loopback, link-local, and otherwise prohibited network destinations. Redirects and DNS resolution must also be handled safely to prevent access to internal services.

### Privacy

- Do not capture raw prompts or completions by default.
- Avoid logging API keys or sensitive headers.
- Redact sensitive metadata.
- Define data retention policies.
- Provide appropriate deletion controls.
- Restrict access to detailed request information.

## 21. API Architecture

FastAPI exposes versioned REST endpoints.

The initial API namespace should be:

```text
/api/v1/
```

### Proposed Endpoint Groups

| Endpoint Group | Responsibility |
|---|---|
| `/auth` | Authentication and account management |
| `/workspaces` | Workspace creation and management |
| `/members` | Workspace membership and roles |
| `/providers` | Provider definitions and connections |
| `/applications` | Applications and environments |
| `/integrations` | Proxy and SDK integration management |
| `/proxy` | Forwarding AI API requests |
| `/usage` | Usage ingestion and retrieval |
| `/requests` | Request Explorer |
| `/quotas` | Quota configurations and consumption |
| `/analytics` | Aggregated usage analytics |
| `/insights` | Usage insights and forecasts |
| `/alerts` | Alert rules and history |
| `/settings` | User and workspace settings |

### API Design Requirements

- Use consistent HTTP methods and status codes.
- Validate request and response schemas with Pydantic.
- Use pagination for large datasets.
- Support filtering and date ranges.
- Return consistent error structures.
- Enforce authentication and authorization.
- Document endpoints through OpenAPI.
- Keep internal service logic separate from route handlers.

### Example Usage Endpoint

```http
GET /api/v1/usage/summary
```

Possible query parameters:

```text
workspace_id
application_id
provider_id
environment_id
start_date
end_date
group_by
```

The backend must validate access to the requested workspace before returning data.

## 22. Data Flow Between Product Windows

The 17 product windows are different interfaces over shared backend services.

| Window | Main Backend Dependencies |
|---|---|
| 1. Landing Page | Public information only |
| 2. Authentication | Authentication service |
| 3. Workspace Setup | Workspace service |
| 4. Connect Provider | Provider service |
| 5. Application Setup | Application service |
| 6. Integration Setup | Integration service, Proxy and SDK configuration |
| 7. Overview | Usage, quota, analytics, and alert services |
| 8. Analytics | Analytics and usage services |
| 9. Quotas | Quota and usage services |
| 10. Request Explorer | Request and usage services |
| 11. Insights | Insights and analytics services |
| 12. Providers | Provider service |
| 13. Applications | Application service |
| 14. Integrations | Integration service |
| 15. Alerts | Alert and notification services |
| 16. Team Management | Workspace membership and authorization |
| 17. Settings | User, workspace, security, and configuration services |

The frontend should not create separate independent data stores for each window. Shared information must come from consistent backend services.

The detailed window contents and cross-window interactions are defined in `product-specification.md`.

## 23. Deployment Architecture

The application should initially support local development through Docker Compose.

### Development Environment

```text
Developer Machine
       |
       v
Docker Compose
       |
       +----------+-----------+-----------+
       |          |           |           |
    Frontend   Backend    PostgreSQL    Redis
                  |
                  v
              Celery Worker
```

### Production Environment

The production deployment should include:

- Frontend hosting.
- FastAPI backend deployment.
- PostgreSQL database.
- Redis instance.
- Background worker processes.
- HTTPS and secure domain configuration.
- Centralized application logging.
- Monitoring and error tracking.
- Database backups.
- Environment-based configuration.

### Environment Separation

At minimum:

- Development.
- Staging.
- Production.

Secrets and credentials must be managed separately for each environment.

## 24. Scalability and Performance

The initial architecture should prioritize correctness and maintainability while allowing future scaling.

### Initial Approach

- Keep the backend modular.
- Use PostgreSQL for authoritative data.
- Use Redis for temporary counters and caching.
- Use background workers for expensive operations.
- Paginate request records.
- Precompute commonly requested analytics.
- Index frequently queried database fields.
- Avoid unnecessary provider API calls.
- Use asynchronous I/O for external provider requests.
- Keep the Proxy request path efficient.

### Future Scaling Options

As usage grows:

- Separate the Proxy into independently scalable services.
- Introduce dedicated event-processing infrastructure.
- Partition high-volume usage tables.
- Introduce read replicas.
- Scale workers independently.
- Move large historical datasets into analytical storage.
- Introduce more advanced streaming and aggregation pipelines.

These are future options, not requirements for the first implementation.

## 25. Testing Architecture

Testing must cover individual modules and complete user workflows.

### Backend Testing

- Authentication tests.
- Workspace isolation tests.
- Role and permission tests.
- Provider adapter tests.
- Proxy forwarding tests.
- Streaming response tests.
- Usage ingestion tests.
- Duplicate event tests.
- Quota calculation tests.
- Concurrent usage update tests.
- Alert evaluation tests.
- API endpoint tests.
- SSRF protection tests.
- Secret redaction tests.

### Frontend Testing

- Navigation tests.
- Authentication flow tests.
- Form validation tests.
- Workspace switching tests.
- API integration tests.
- Loading and error states.
- SVG chart rendering and interactions.
- Responsive layout tests.
- Keyboard navigation.
- Accessibility.
- Reduced-motion behaviour.
- Design-token consistency.

### Integration Testing

Test complete workflows such as:

1. Create an account.
2. Create a workspace.
3. Connect a provider.
4. Create an application.
5. Configure an integration.
6. Send an AI API request.
7. Capture usage.
8. Verify usage in the dashboard.
9. Configure a quota.
10. Trigger and receive an alert.

Use provider mocks for automated tests where real external API access is unnecessary. Maintain separate controlled integration tests for actual provider behaviour.

## 26. Architectural Decisions and Constraints

The following decisions should guide implementation:

1. **Modular monolith first:** Start with one organized FastAPI backend. Do not introduce microservices prematurely.
2. **Provider adapters:** Keep provider-specific behaviour inside dedicated adapters.
3. **Two integration methods:** Support both API Proxy and SDK/Middleware.
4. **PostgreSQL as source of truth:** Confirmed historical usage must be persisted.
5. **Redis for temporary operations:** Do not rely on Redis alone for historical records.
6. **Backend-authoritative calculations:** Quota consumption, analytics, and permissions must be validated by the backend.
7. **Workspace isolation:** All workspace-owned data must be protected by backend authorization.
8. **Explicit data provenance:** Distinguish provider-reported, Proxy-observed, SDK-reported, and estimated information.
9. **Privacy by default:** Do not capture raw prompts or responses unless explicitly enabled.
10. **Honest provider capabilities:** Do not display unsupported provider features as operational.
11. **Real integrations:** Preview data must never be mistaken for actual provider usage.
12. **Progressive scalability:** Build a reliable initial system before introducing advanced infrastructure.
13. **Custom SVG visualisations:** Do not introduce a charting library; follow `design.md`.
14. **Shared visual system:** The frontend must implement the approved navigation, typography, colour tokens, components, and responsive rules.
15. **Distinct window compositions:** Share components where appropriate, but do not force every window into one layout.

## 27. Final Architecture Goal

Quotient should operate as a unified monitoring and quota management layer for AI providers and the applications using them.

Its architecture must make it possible to:

- Connect multiple AI providers.
- Monitor multiple applications and environments.
- Collect usage through Proxy and SDK integrations.
- Normalize provider-specific usage data.
- Track provider-imposed and user-defined limits.
- Analyze requests and consumption patterns.
- Detect relevant usage anomalies.
- Generate reliable alerts and insights.
- Support individual developers and larger teams.
- Present information through a consistent, distinctive, responsive interface.
- Scale without requiring a complete architectural redesign.

The most important architectural principle is **accurate, secure, and transparent usage visibility**.

Every number shown in Quotient must have a traceable source, every quota must have a defined meaning, and every integration must report only what it can actually observe.