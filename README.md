<!-- The Visual Hook -->
<div align="center">
  <img src=".github/assets/flight-manual-cockpit.png" alt="Flight Manual Hero Image" width="800">
  
  <h1>Flight Manual</h1>
  <p><strong>Enterprise-grade documentation without the enterprise price tag.</strong></p>
  
  <!-- The 6-Badge Array -->
  <a href="https://flightmanual.scramjet.io" target="_blank"><img src="https://img.shields.io/badge/Live-Demo-2ecc71?style=flat-square&logo=cloudflarepages&logoColor=white" alt="Live Demo"></a>
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/scramjetio/flight-manual"><img src="https://img.shields.io/badge/Deploy-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Deploy to Cloudflare"></a>
  <a href="https://scramjet.io" target="_blank"><img src="https://img.shields.io/badge/Powered_by-Scramjet-000000?style=flat-square&logo=rocket&logoColor=cyan" alt="Powered by Scramjet"></a>
  <a href="https://discord.gg/scramjetio" target="_blank"><img src="https://img.shields.io/badge/Chat-Discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/scramjetio/flight-manual/stargazers"><img src="https://img.shields.io/github/stars/scramjetio/flight-manual?style=flat-square&color=yellow" alt="GitHub Stars"></a>
  <a href="https://github.com/scramjetio/flight-manual/actions"><img src="https://img.shields.io/github/actions/workflow/status/scramjetio/flight-manual/deploy.yml?style=flat-square" alt="CI Status"></a>
</div>

## What is Flight Manual?

Backend teams using TypeScript schema validation (Zod, etc.) ship API reference docs that regenerate from source on every deploy. Hosted on Cloudflare's free tier, Flight Manual gives you a beautiful, deterministic documentation engine without paying $250/mo to a docs SaaS or maintaining an OpenAPI spec separately from your actual schemas.

### Core Capabilities

- **TypeScript Schema Codegen:** Parse Zod schemas from your backend and deterministically generate MDX reference documentation at build time. The code is the source of truth; the docs follow automatically.
- **Interactive API Playground:** Integrated Scalar OpenAPI UI for live endpoint testing.
- **Agent-Ready Artifacts:** Automatically generates `llms.txt` during the build process so Perplexity, Claude, and internal agents can parse your APIs.
- **Cost:** $0. Flight Manual is MIT licensed.

### What It Doesn't Do

To be transparent, Flight Manual is focused strictly on code-driven API references. It does not include:
- A bi-directional Git web editor for PMs or technical writers.
- LLM-driven autonomous agents that draft narrative tutorials from code diffs.

If your documentation is heavily narrative (tutorials, conceptual guides) and maintained by non-engineers, we highly recommend managed solutions like Mintlify. If your docs are predominantly API references managed by backend engineers, Flight Manual automates the drift away.

## 🎥 In Action
> **[TODO]:** Insert a 5-second WebP or GIF here showing the UI being interacted with.
*(Placeholder: `<img src=".github/assets/demo.webp" alt="Demo" width="100%">`)*

## 🚀 Quick Start

**Prerequisites:** Node.js >= 18.0

```bash
git clone https://github.com/scramjetio/flight-manual.git
cd flight-manual
npm install
npm run dev
```

To enable the AI Agent and Vector DB integration, create your database and deploy:
```bash
npx wrangler vectorize create flight-manual-docs --dimensions=768 --metric=cosine
npm run deploy
```


<details>
<summary><strong>🗺️ View Architecture Diagram</strong></summary>

```mermaid
graph TD
    subgraph GitHub
        A[Backend Repos] -->|GitHub Actions| B(Flight Manual Repo)
        B -->|Auto-PR| C{Docs Updated}
    end

    subgraph Cloudflare Pages
        C -->|Deploy| D[Astro Static Site]
        D -->|/enterprise| E[Edge Middleware RBAC]
        D -->|/api/chat| F[Edge Agent Router]
    end

    subgraph Cloudflare Workers
        F <--> G[(Durable Object: DocsAgent)]
        G <--> H[Workers AI: Llama 3]
        G <--> I[(Vectorize DB)]
    end
```
</details>

## 📄 License
MIT © The Scramjet Team
