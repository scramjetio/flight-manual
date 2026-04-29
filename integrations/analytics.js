/**
 * cf-analytics: Astro integration that injects Cloudflare Web Analytics.
 *
 * Free, privacy-first analytics. No cookies, no tracking pixels.
 * Just add your CF Web Analytics token.
 *
 * @param {{ token: string }} options
 * @returns {import('astro').AstroIntegration}
 */
export function cfAnalytics(options) {
  return {
    name: "cf-analytics",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: "cf-analytics-inject",
                transformIndexHtml(html) {
                  return html.replace(
                    "</body>",
                    `<!-- Cloudflare Web Analytics -->
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${options.token}"}'></script>
</body>`,
                  );
                },
              },
            ],
          },
        });
      },
    },
  };
}
