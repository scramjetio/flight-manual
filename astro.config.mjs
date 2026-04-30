// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { llmsTxt } from "./integrations/llms-txt";
import { cfAnalytics } from "./integrations/analytics";

// ============================================================================
// docs-starter: Astro Starlight Configuration
// (Renamed to FlightManual)
// An open-source Mintlify alternative for Hono/Cloudflare projects.
//
// Customize these values for your project:
// ============================================================================

const SITE_CONFIG = {
  // --- Required ---
  title: "Flight Manual",
  tagline: "The Modern Content Substrate for the AI Era.",
  githubUrl: "https://github.com/scramjetio/flight-manual",

  // --- Optional ---
  logo: undefined,
  analyticsToken: undefined,
};

export default defineConfig({
  site: "https://docs.cloudstart.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    starlight({
      title: SITE_CONFIG.title,
      tagline: SITE_CONFIG.tagline,
      logo: SITE_CONFIG.logo,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: SITE_CONFIG.githubUrl,
        },
      ],
      // Premium dark theme by default, now including globals for tailwind
      customCss: ["./src/styles/custom.css", "./src/styles/globals.css"],
      // Component Overrides
      components: {
        Pagination: "./src/components/docs/Pagination.astro",
      },
      // Sidebar: auto-generate from folder structure with manual overrides
      sidebar: [
        { label: "Welcome", slug: "index" },
        { label: "Quickstart", slug: "quickstart" },
        { label: "Configuration", slug: "configuration" },
        { label: "Scramjet Automation", slug: "scramjet-pipeline" },
        { label: "API Playground", slug: "api-reference" },
        {
          label: "Component Library",
          autogenerate: { directory: "components" },
        },
        {
          label: "Wiki / HQ",
          autogenerate: { directory: "wiki" },
        },
      ],
      // Tables of contents depth for more navigation detail
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      // Enable edit links
      editLink: {
        baseUrl: "https://github.com/scramjetio/flight-manual/edit/main/src/content/docs/",
      },
      // Head: add meta tags
      head: [
        {
          tag: "meta",
          attrs: { property: "og:type", content: "website" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image", content: "https://docs.cloudstart.dev/og-image.png" },
        },
        {
          tag: "meta",
          attrs: { property: "og:logo", content: "https://docs.cloudstart.dev/android-chrome-512x512.png" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:image", content: "https://docs.cloudstart.dev/og-image.png" },
        },
        {
          tag: "link",
          attrs: { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        },
        {
          tag: "link",
          attrs: { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        },
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        },
        {
          tag: "link",
          attrs: { rel: "manifest", href: "/site.webmanifest" },
        },
      ],
      // Enable expressive code (syntax highlighting)
      expressiveCode: {
        themes: ["github-dark"],
        useThemedScrollbars: false,
      },
    }),
    // Auto-generate llms.txt and llms-full.txt at build time
    llmsTxt({
      siteName: SITE_CONFIG.title,
      siteDescription: SITE_CONFIG.tagline,
    }),
    // Inject Cloudflare Web Analytics (if token provided)
    ...(SITE_CONFIG.analyticsToken
      ? [cfAnalytics({ token: SITE_CONFIG.analyticsToken })]
      : []),
    sitemap(),
  ],
});
