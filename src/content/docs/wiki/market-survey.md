---
title: "Market Survey: Documentation Platforms"
description: Competitive landscape analysis of documentation engines and platforms — infrastructure-level comparison against FlightManual.
---

> **Note:** This is an **infrastructure comparison**, not a content comparison. We evaluate the underlying framework capabilities, not how any specific company's docs look.

## Competitive Landscape (2026)

### The Players

| Platform | Type | Price | Base Tech | Deploy Target |
|----------|------|-------|-----------|---------------|
| **FlightManual** | Self-hosted OSS | Free | Astro Starlight + MDX | Cloudflare Pages |
| **Mintlify** | Managed SaaS | $150-500/mo | MDX + Next.js | Managed cloud |
| **Fern** | Open-core + Managed | $250/mo+ | Custom + Docker | Managed / Self-hosted |
| **Stripe Markdoc** | Internal OSS framework | N/A | markdown-it → AST → React | Internal |
| **Docusaurus** | Self-hosted OSS | Free | React + MDX | Any static host |
| **GitBook** | Managed SaaS | $8-15/user/mo | Proprietary | Managed cloud |
| **ReadMe** | Managed SaaS | $99-399/mo | Proprietary | Managed cloud |
| **Redocly** | Open-core + SaaS | Free-$600/mo | React (Redoc OSS) | Any / Managed |
| **Scalar** | OSS + SaaS | Free-$49/mo | Vue/React | Any / Managed |

---

## Infrastructure Capability Matrix

### 1. Core Authoring

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| MDX/Markdown | ✅ | ✅ | ✅ | Custom | ✅ | WYSIWYG | WYSIWYG | ✅ | N/A |
| Git-native workflow | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Sync | ⚠️ | ✅ | ✅ |
| Visual editor | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Schema-validated tags | ❌ | ✅ | ✅ | ✅ | ❌ | N/A | N/A | ✅ | N/A |
| Versioning | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| i18n | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |

### 2. Design System

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Premium dark theme | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ |
| Component library size | 10+ | 30+ | 20+ | 20+ | 15+ | N/A | N/A | 10+ | 5 |
| Brand config file | ⚠️ | ✅ `mint.json` | ✅ `fern.config` | ❌ | ✅ `docusaurus.config` | ✅ | ✅ | ✅ `redocly.yaml` | ✅ |
| Custom CSS control | ✅ Full | ⚠️ Limited | ⚠️ Limited | ✅ Full | ✅ Full | ❌ | ❌ | ✅ | ✅ |

### 3. API Reference & Interactive Features

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| OpenAPI auto-gen | ⚠️ Scalar | ✅ | ✅ | ❌ | Plugin | ✅ | ✅ | ✅ | ✅ |
| Interactive playground | ⚠️ | ✅ | ✅ | ✅ | ❌ | ⚠️ | ✅ | ✅ | ✅ |
| SDK code samples | ❌ | ❌ | ✅ Multi-lang | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| SDK generation | ❌ | ❌ | ✅ 9 languages | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| API key auto-fill | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Feedback widget | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |

### 4. Search & AI

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Full-text search | ✅ Pagefind | ✅ AI semantic | ✅ AI search | ✅ Algolia | ✅ Algolia | ✅ | ✅ | ✅ | ❌ |
| AI chat assistant | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `/llms.txt` generation | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| MCP server | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 5. Content Pipeline (Docs-as-Code)

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Auto-gen from source code | ⚠️ MVP | ✅ Autopilot | ✅ From API spec | ❌ | Plugin | ❌ | ❌ | ✅ From spec | ❌ |
| CI/CD integration | ⚠️ Manual | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| Breaking change detection | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Pipeline-driven content | ⚠️ `gather-content` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 6. Deployment & Performance

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Edge deployment | ✅ CF Pages | ✅ Managed | ✅ | N/A | ❌ | ✅ | ✅ | ✅ | ❌ |
| Self-hostable | ✅ | ❌ | ✅ Docker | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Zero vendor lock-in | ✅ | ❌ | ⚠️ | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ |
| Build speed | ✅ <4s | ✅ | ✅ | ✅ | ⚠️ Slower | N/A | N/A | ✅ | N/A |

### 7. Analytics & Observability

| Capability | FlightManual | Mintlify | Fern | Markdoc | Docusaurus | GitBook | ReadMe | Redocly | Scalar |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Page analytics | ✅ CF Analytics | ✅ Built-in | ✅ | ❌ | Plugin | ✅ | ✅ | ✅ | ❌ |
| Human vs AI traffic | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| API usage analytics | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

---

## Notable "Made With" Examples

### Made with Mintlify
- [Anthropic Docs](https://docs.anthropic.com) — Claude API reference
- [Resend](https://resend.com/docs) — Email API
- [Turso](https://docs.turso.tech) — Edge database
- [Loops](https://loops.so/docs) — Email marketing
- [Trigger.dev](https://trigger.dev/docs) — Background jobs

### Made with Fern
- [Cohere](https://docs.cohere.com) — AI/ML API + SDKs
- [Flatfile](https://flatfile.com/docs) — Data onboarding
- [Webflow](https://developers.webflow.com) — Design platform API
- [Vapi](https://docs.vapi.ai) — Voice AI
- [Hume AI](https://dev.hume.ai) — Empathic AI

### Made with Docusaurus
- [React Native](https://reactnative.dev) — Mobile framework
- [Jest](https://jestjs.io) — Testing framework
- [Supabase](https://supabase.com/docs) — Firebase alternative
- [Cloudflare Workers](https://developers.cloudflare.com) — Edge compute
- [Ionic](https://ionicframework.com/docs) — Mobile UI

### Made with GitBook
- [Snyk](https://docs.snyk.io) — Security platform
- [PlanetScale](https://docs.planetscale.com) — Serverless MySQL
- [Railway](https://docs.railway.com) — Infra platform

### Made with Redocly
- [Docker Hub API](https://docs.docker.com/reference/api/hub/latest/) — Container registry
- [Rebilly](https://www.rebilly.com/docs/) — Payments platform

### Made with Scalar
- [Scalar demo](https://docs.scalar.com) — Their own reference
- Various API-first startups

---

## FlightManual Positioning

> **FlightManual occupies a unique position**: it's the only documentation engine that combines self-hosted OSS (free), Cloudflare-native edge deployment, AI-native exports (`llms.txt`), AND an integrated content pipeline (Scramjet).

### Where FlightManual Wins

| Advantage | Why It Matters |
|-----------|---------------|
| **$0 cost** | Mintlify is $150-500/mo, Fern is $250/mo+. FlightManual is free forever. |
| **No vendor lock-in** | Plain MDX files in Git. Switch frameworks anytime. |
| **Cloudflare-native** | 0ms TTFB at 300+ edge locations. No cold starts. |
| **AI-native from day 1** | `/llms.txt` is built-in, not an afterthought. |
| **Scramjet pipeline** | Auto-generate docs from source code. No other OSS framework can do this. |

### Where FlightManual Needs Investment

| Gap | Competitor | Priority |
|-----|-----------|----------|
| Component library (5 vs 30+) | Mintlify, Fern | P0 |
| Interactive API playground | Mintlify, Fern, Scalar | P0 |
| SDK generation | Fern (unique) | P2 (not our lane) |
| AI chat assistant | Mintlify, GitBook | P1 |
| Visual editor for non-devs | GitBook, Mintlify | P2 |
| Content versioning | Docusaurus, Fern | P1 |

---

## Strategic Recommendations

1. **Don't compete on SDK generation** — that's Fern's moat, and it's not relevant to our use case
2. **Compete on content automation** — "your docs write themselves" is a message no competitor can match
3. **Compete on cost** — $0 vs $150-500/mo is a real differentiator for indie devs and startups
4. **Build the component library** — this is table stakes; without `<ApiField>`, `<Schema>`, `<Endpoint>` components, FlightManual feels unfinished
5. **Ship `npx create-flight-manual`** — one-command setup is the growth vector
