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

---

## ⚡️ The Problem
Existing documentation templates (like vanilla Docusaurus) are painfully basic out-of-the-box, forcing you to spend hundreds of engineering hours building custom React components just to make them look modern. If you don't want to build it yourself, you are forced to pay Managed SaaS platforms $150 to $500 a month to unlock "premium" features like a floating AI chatbot, edge-based Role-Based Access Control (RBAC), and interactive API playgrounds. You are held hostage by vendor lock-in.

## 🌟 The Solution (Flight Manual)
Flight Manual is an open-source, "Venture-Backed SaaS" grade documentation engine built on top of Astro Starlight. It gives you the legendary aesthetics and powerful features of a $500/month enterprise platform, 100% for free.

### 💎 The Premium Arsenal (What makes it special)
You get these features completely out-of-the-box, saving you months of engineering time and thousands of dollars:
* **The $100/mo Paywall Breaker (Native AI):** A fully integrated, stateful Llama 3 Chatbot powered by `assistant-ui` and Cloudflare Durable Objects. You own the Vectorize database and the compute, paying $0 to third-party wrappers.
* **Mintlify-Tier DX:** Gorgeous, glassy components featuring deep radial glows, interactive OpenAPI Scalar playgrounds, and beautifully designed `<Endpoint>` and `<ApiField>` primitives out of the box.
* **Zero-Config Edge RBAC:** Cloudflare Pages Middleware natively locks down private `/enterprise` directories at the edge without needing to build and maintain a custom Node.js authentication server.
* **No Vendor Lock-in:** The entire site is powered by plain `.mdx` files sitting in your Git repository. You own your data.

---

## 🥊 Competitor FAQ (Why choose Flight Manual?)

**"Why not just use Docusaurus?"**
Because Docusaurus looks extremely basic out-of-the-box. To make Docusaurus look like a modern, premium startup documentation site, you have to write thousands of lines of custom React and CSS. Docusaurus also lacks a native interactive API playground (Scalar) and doesn't come with an integrated Llama 3 AI Chatbot.

**"Why not just use Mintlify or GitBook?"**
Price and lock-in. Both are fantastic platforms, but they charge $150 to $500+ a month for their advanced tiers (which you need to unlock AI features or remove their branding). Worse, you are locked into their proprietary systems. Flight Manual gives you their aesthetic and AI features for $0, while letting you keep your documentation in simple Markdown files.

**"Why not use Fern?"**
Fern is an incredible tool for SDK generation, but it has a steep learning curve, requires heavy Docker dependencies, and costs $250+/month for their managed tier. Flight Manual focuses strictly on gorgeous, AI-native documentation that deploys in 3 minutes.

---

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
