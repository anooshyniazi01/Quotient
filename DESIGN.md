# Quotient — Design System

**Tagline:** Monitor every API. Master every limit.
**Reference prototype:** `quotient-preview.html` (single-file, static, fictional data)

Quotient is a provider-independent AI API observability and quota management platform. The interface should feel like precise technical instrumentation: trustworthy, data-rich, calm. It must not look like a generic AI SaaS template.

---

## 1. Principles

1. **White first, navy and amber with purpose.** White dominates. Navy carries weight (panels, charts, code, status strip). Amber marks data and state (quota fills, forecasts, active markers, primary actions).
2. **Instrument, not ornament.** Every visual encodes something: usage, limits, flow, time. No decorative blobs, orbs, sparkles, gradients or glass effects.
3. **Hierarchy through type and contrast**, not through shadows and rounded boxes. Prefer hairline borders, background shifts and spacing.
4. **Vary layout by purpose.** Each window has its own composition. Avoid repeating "title + four cards + chart + table".
5. **Evidence over chat.** Intelligence is shown as structured findings with evidence and confidence, never a chatbot.
6. **Always label data provenance.** Provider-reported, observed, estimated and user-configured values look different.

---

## 2. Colour

### Core palette
| Token | Hex | Use |
|---|---|---|
| `--navy` | `#14213D` | Primary text, dark panels, nav strip, code blocks, selected states |
| `--amber` | `#FCA311` | Primary button, quota fills, highlights, active nav marker |
| White | `#FFFFFF` | Page and card background |
| `--line` | `#E5E5E5` | Borders and dividers |
| Black | `#000000` | Reserved for strong contrast only |

### Supporting tints
| Token | Hex | Use |
|---|---|---|
| `--navy2` | `#1B2C52` | Raised surface on navy |
| `--navy3` | `#2B3D69` | Secondary chart series, hover on navy |
| `--navy4` | `#4A5C86` | Tertiary series, ticks |
| `--navy5` | `#8793B0` | Muted text on navy |
| `--amber2` | `#FFD27A` | Light amber series, code strings |
| `--amber3` | `#FFEFCB` | Focus ring, warning background |
| `--amber4` | `#FFF8E8` | Active nav, row hover, soft highlight |
| `--amberD` | `#B36A00` | Amber used as text on white (contrast safe) |
| `--mut` | `#5C667D` | Secondary text |
| `--mut2` | `#8A92A5` | Tertiary text, labels |
| `--bg2` | `#F5F5F3` | Secondary neutral background |
| `--line2` | `#EEEEEC` | Subtle row dividers |

### Status colours (functional only, never brand)
| Token | Hex | Use |
|---|---|---|
| `--ok` / `--okbg` | `#1F8A5B` / `#E6F4EC` | Healthy, delivered, verified |
| `--bad` / `--badbg` | `#C9382E` / `#FBE9E7` | Errors, critical, destructive |
| Warning | amber family | Near limit, degraded |

### Quota meter colour rule
Fill is navy below the warning threshold, amber from warning to critical, red at or above critical. Defaults: warning 70%, critical 90%.

### Chart colour order (providers)
OpenAI navy `#14213D`, Groq `#4A5C86`, OpenRouter `#C3CADB`, Anthropic `#FFD27A`, Gemini amber `#FCA311`. Keep a provider's colour identical in every chart.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display, page titles, big metrics | **Instrument Serif** (regular, italic for emphasis) | 26–92px depending on context |
| UI and body | **Instrument Sans** 400 / 500 / 600 | Base 14px, line-height 1.5 |
| Technical | **IBM Plex Mono** 400 / 500 | IDs, tokens, endpoints, logs, code, tabular labels |

Scale (px): page title 36, section title 26–32, metric 30–72, card title 14 (600), body 14, support 12.5, micro label 10.5.
Eyebrow labels: mono, 10.5px, uppercase, letter-spacing .12em, `--mut2`. Use sparingly. Do not bold everything; weight 500 is the default emphasis.
Numbers use tabular figures in tables.

---

## 4. Layout and spacing

- Spacing unit 4px; common steps 6, 8, 12, 16, 18, 24, 32.
- Page max width 1380px, side padding 28px (16px on mobile).
- Corner radius: 3–6px on controls and panels, 8px on modals and large panels. Never pill-shaped containers except tiny status dots.
- Borders 1px `--line`. Shadows only on floating layers (dropdowns, toasts, dock).
- Decorative scale motif: thin tick marks (`repeating-linear-gradient`) under the landing nav and in navy panels, echoing a measuring instrument.
- Breakpoints: 1180 (tablet landscape), 940 (stack two-column layouts), 820 (bottom nav), 520 (small phone).

---

## 5. Navigation

- **Status strip (navy, 46px):** wordmark, workspace switcher, environment switcher, live request rate, quota %, month-to-date spend, `Ctrl K`, alerts, avatar.
- **Section bar (white, sticky):** three labelled groups with a dotted rule.
  - **Monitor:** Overview, Analytics, Quotas, Requests, Insights
  - **Manage:** Providers, Applications, Integrations, Alerts
  - **Workspace:** Team, Settings
- Active item: pale amber (`--amber4`) background, navy text, 3px amber underline.
- Mobile (≤820px): the bar becomes a fixed, horizontally scrollable bottom bar with icons and short labels.
- **Prototype map:** a floating "Window nn/17" button opens a grid of all windows. `Ctrl K` opens a jump palette.
- Onboarding (windows 3–6) uses a navy vertical **progress track** with dotted connector, plus a fixed footer with Previous, Skip for now and Continue.

---

## 6. Components

| Component | Spec |
|---|---|
| **Button** | 36px high, 5px radius. `pri` amber fill, navy text. `dk` navy fill. Default white with border. `gh` ghost. `dg` red text. `lg` 48px. `sm` 30px. |
| **Input / select** | 38px, 1px border, focus: navy border plus 3px `--amber3` ring. Mono variant for keys and URLs. Error border red, valid border green. |
| **Switch** | 36×20, navy when on with amber thumb. |
| **Checkbox** | 18px square, navy fill with amber tick. |
| **Badge** | 11px text, 3px radius. Variants: neutral, ok, warn, bad, navy, amber, outline, mono. |
| **Tabs** | Underline style, amber 2px indicator. |
| **Segmented control** | Navy selected segment, or amber on the `am` variant. |
| **Filter chip / dropdown** | 32px chip with grey key label and bold value, menu with navy border. |
| **Table** | Mono uppercase 10.5px headers, 11px row padding, amber-tint row hover, clickable rows open a drawer. |
| **Meter** | 10px bar with segmented tick overlay and warning/critical threshold markers. Animates width on load. |
| **Panel** | White with 1px border. `nv` navy panel, `am` pale amber panel. Header row with bottom hairline. |
| **Modal** | 3px amber top border, 8px radius, dimmed navy backdrop. Used for create, confirm and edit flows. |
| **Drawer** | Right slide-over, up to 680px, navy left border. Used for request, alert and member detail. |
| **Toast** | Navy, amber check, auto-dismiss. Demo actions add a "demo" tag. |
| **Code block** | Navy, mono 12.5px, amber strings, grey comments, copy button. |
| **Timeline** | Vertical hairline with dot markers (amber = event, red = failure). |
| **Provider mark** | Rounded square, navy with amber glyph (stylised placeholders, replace with licensed logos). |
| **Application glyph** | Outlined square with serif initial and an amber corner notch. |
| **Empty state** | Dashed container, serif headline, one clear action, ghost illustration. |
| **Confirmation** | Destructive actions use a modal. High-risk actions require typing a confirmation value (e.g. workspace slug). |

### Icons
Single inline-SVG set: 24px grid, 1.7px stroke, round caps and joins, `currentColor`. No emoji, no Unicode symbols as icons.

---

## 7. Data visualisation

- Custom SVG, no chart library. Lines use non-scaling strokes; axis labels are HTML.
- Types used: stacked area, line with dashed previous-period comparison, columns, stacked columns, donut, horizontal bars, dot plot (latency vs cost), heatmap (hour × weekday), sparklines, forecast chart with dashed projection, latency waterfall, quota meters.
- Hover: vertical guide line plus navy tooltip listing every series.
- Navy for the primary series, amber for emphasis and projections, grey-blue for comparison. Red only for limits and errors.
- Do not fill screens with charts. Pair each with a question it answers.

### Source-of-truth badges (Quotas)
| Source | Style | Meaning |
|---|---|---|
| Provider-reported | Navy fill, shield | Read from the provider |
| Observed | Outline, eye | Counted by Quotient traffic |
| Estimated | Dashed outline, target | Derived from usage and list price |
| Your limit | Amber fill, sliders | User-configured, optionally enforced |

---

## 8. Window-by-window composition

| # | Window | Composition |
|---|---|---|
| 1 | Landing | Left-aligned serif hero and animated navy flow diagram, counter strip, problem rows, Proxy/SDK diagram toggle, capability viewer, provider table, pricing, CTA, footer |
| 2 | Authentication | Underlined-field form with sign-in / create-account tabs, validation, OAuth, code-entry verification; navy side panel with a live request tape |
| 3 | Workspace setup | Form plus live navy workspace preview, success state |
| 4 | Connect provider | Six selectable tiles, config panel, simulated verify, discovered models |
| 5 | Application setup | Form plus live entity tree (workspace → app → environments → providers) |
| 6 | Integration setup | Proxy / SDK toggle, flow diagram, config, code tabs, test request and status |
| 7 | Overview | Navy "pulse band" of key metrics, provider stacked chart, quota health, breakdowns, activity, alerts, quick actions |
| 8 | Analytics | Filter bar, scorecard tabs, period compare, percentiles, heatmap, comparisons, table, export |
| 9 | Quotas | Grouped expandable meters with source badges, forecast panel, reset windows, custom-limit modal |
| 10 | Request explorer | Search and filters, dense table, slide-over detail with lifecycle waterfall |
| 11 | Insights | Inbox list plus evidence detail, confidence, recommended actions, review/save/dismiss |
| 12 | Providers | Connected provider plates, directory, detail tabs |
| 13 | Applications | Ledger table, detail tabs (overview, environments, integrations, quotas, activity, settings) |
| 14 | Integrations | Grouped list plus detail tabs (configuration, activity, diagnostics, security, testing); add flow reuses window 6 |
| 15 | Alerts | Three distinct views: triggered feed, rule sentences, notification history and channels |
| 16 | Team | Members table, pending invites, permission matrix, member drawer, ownership transfer |
| 17 | Settings | Indexed category list with label-left / control-right rows (9 categories) |

---

## 9. Motion

- Purposeful only: request packets along flow paths, counters on view, line draw-in, meter fill, reveal on scroll (fade and 22px rise), tape scroll on auth.
- Durations 150–250ms for UI, up to 2.4s for illustrative draws. Ease: `cubic-bezier(.2,.7,.2,1)`.
- No bouncing, parallax or looping decoration beyond the flow packets and live indicators.
- `prefers-reduced-motion` disables animations, shows final states and pauses SVG animation.

---

## 10. Responsive behaviour

- Two-column layouts collapse to one at 940px; three and four-column grids drop to two at 820px.
- Tables scroll horizontally inside their container.
- Drawers become full width; modals use 92vw.
- Navigation moves to a bottom bar; the live ticker and shortcut hint are hidden.

---

## 11. Content and sample data rules

- Workspace: **Meridian Labs** (`meridian-labs`).
- Applications: **Atlas** (Gemini), **Lumen** (OpenAI), **Halcyon** (Groq), **Cipher** (Anthropic), **Relay** (OpenRouter, Gemini fallback).
- Keep the same application, provider, integration and numbers across every window (e.g. 1,284,906 requests, $6,139.00, 2.46B tokens over 30 days).
- Request IDs `req_xxxxxxxx`, application IDs `app_xxxxxxxx`, integration keys `qk_live_…`. All values are fictional.

---

## 12. Do not

- Purple, blue or pink gradients, glows, orbs, glassmorphism, sparkles, robots, neural-net art.
- Identical metric-card rows, repeated chart-card layouts, generic sidebar-plus-topbar shells.
- Emoji as icons, excessive uppercase, heavy bold, oversized headings over content.
- Decorative animation, bouncing buttons, parallax.
- Buttons that look functional but do nothing: every control gives a visible preview result.

---

## 13. Implementation notes

- Prototype is a single HTML file: CSS variables in `:root`, JavaScript rendering functions per window, hash routing (`#/overview`), inline SVG, event delegation via `data-*` attributes.
- Fonts via Google Fonts with system fallbacks.
- For production, replace stylised provider marks with licensed logos, move tokens into a theme file, and replace sample data with API data.