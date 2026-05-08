# RFC-ORG-001: Fleet-Wide Deployment & Staging Architecture

| Field | Value |
|-------|-------|
| RFC | ORG-001 |
| Title | Fleet-Wide Deployment & Staging Architecture |
| Status | Accepted |
| Created | 2026-05-06 |
| Applies To | All SaaS repositories using Cloudflare Workers & D1 (e.g., Pages Plus, WriteIQ, Scramjet) |

## Summary

This RFC establishes an organization-wide standard for how we deploy code and migrate databases across all our Cloudflare Worker + D1 SaaS applications. To protect our customers from zero-day disruptions, we are moving away from instant production rollouts and empty-database staging. 

Every fleet repository must implement a 4-Layer Staging and Deployment Architecture:
1. Prod-to-Staging Data Mirrors
2. Gradual Deployments (Canary Rollouts)
3. Preview Environments
4. Strict D1 Migration Safety (Expand-Contract Pattern)

## Motivation

As our applications mature (Pages Plus, WriteIQ, etc.) and onboard paying customers, the cost of a bad deployment increases. Currently, many applications lack safe staging environments populated with realistic data, and `wrangler deploy` pushes code instantly to 100% of traffic. We need a unified standard to ensure zero-downtime updates and confident D1 migrations without breaking production data.

## Specification

### Layer 1: Prod-to-Staging Data Mirror

All applications must have a `*-staging` D1 database. Migrations and feature testing must occur against a sanitized snapshot of production data.

**Requirements:**
- A `.github/scripts/mirror-prod-to-staging.sh` script must exist in the repo.
- The script must use `wrangler d1 export` to snapshot production data.
- The script must sanitize PII (e.g., user email addresses, sensitive keys) before import.
- The script must import the sanitized SQL into the staging D1 database.
- A GitHub Action must run this mirror script automatically (e.g., weekly) and prior to manual staging deploys.

### Layer 2: Gradual Deployments

Instant 100% traffic cutovers are forbidden for production API Workers.

**Requirements:**
- Production deployments must use `wrangler deploy --gradual-rollout 10` (or similar low percentage).
- A subsequent "Promote" CI/CD job must be used to push to 100% after monitoring error rates in Cloudflare Analytics / Sentry.
- If errors spike, the deployment must be instantly rolled back.

### Layer 3: Preview Environments

Developers and QA must be able to test features end-to-end on a realistic environment without affecting the primary production domain.

**Requirements:**
- A `preview` environment must be defined in `wrangler.toml` or `wrangler.jsonc`.
- The preview environment must use the staging D1 database (`*-staging`).
- Frontends (Vite, Astro, etc.) must support preview domains (e.g., `*.preview.writeiq.co` or Cloudflare Pages preview URLs) that securely proxy or talk to the preview API Worker.

### Layer 4: D1 Migration Safety (Expand-Contract)

Because D1 has a single, shared database state and no branching, blue-green deployments only version the Worker code, not the data.

**Requirements (The Expand-Contract Pattern):**
- **Phase 1 (Expand):** Add the new table/column. Backfill data. Worker writes to both old and new, reads from old.
- **Phase 2 (Contract):** Switch Worker reads to the new table.
- **Phase 3 (Cleanup):** Days/weeks later, drop the old table.
- **Forbidden in a single deploy:** `DROP TABLE`, `DROP COLUMN`, `RENAME`.
- All Drizzle schemas and migration SQL must be backward-compatible with the currently executing Worker.

## Tracking & Implementation

Each applicable repository must create an epic or checklist to implement the above layers. 
Once a repository complies with these 4 layers, it achieves "Production Grade Deployment" status.
