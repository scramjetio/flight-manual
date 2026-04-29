/**
 * llms-txt: Astro integration that generates llms.txt and llms-full.txt at build time.
 *
 * These files make your documentation natively readable by AI agents,
 * following the llmstxt.org specification.
 *
 * - /llms.txt — Navigation structure with links (lightweight)
 * - /llms-full.txt — Full content concatenation (comprehensive)
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, relative, basename } from "node:path";

/**
 * @param {{ siteName: string, siteDescription: string }} options
 * @returns {import('astro').AstroIntegration}
 */
export function llmsTxt(options) {
  return {
    name: "llms-txt",
    hooks: {
      "astro:build:done": async ({ dir, pages }) => {
        const outDir = dir.pathname;
        const allPages = pages
          .map((p) => p.pathname)
          .filter((p) => p && !p.startsWith("404") && !p.startsWith("_"))
          .sort();

        // --- Generate /llms.txt (nav structure + links) ---
        const llmsTxtLines = [
          `# ${options.siteName}`,
          "",
          `> ${options.siteDescription}`,
          "",
          "## Documentation Pages",
          "",
        ];

        for (const page of allPages) {
          const cleanPath = page.replace(/\/$/, "") || "/";
          const title = cleanPath
            .split("/")
            .filter(Boolean)
            .pop()
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()) || "Home";
          llmsTxtLines.push(`- [${title}](/${cleanPath})`);
        }

        llmsTxtLines.push(
          "",
          "## Machine-Readable Content",
          "",
          "- [Full Documentation](/llms-full.txt): Complete documentation content in a single file.",
        );

        await writeFile(
          join(outDir, "llms.txt"),
          llmsTxtLines.join("\n"),
          "utf-8",
        );

        // --- Generate /llms-full.txt (full content) ---
        const fullLines = [
          `# ${options.siteName} — Full Documentation`,
          "",
          `> ${options.siteDescription}`,
          "",
        ];

        for (const page of allPages) {
          const htmlPath = join(outDir, page, "index.html");
          try {
            const html = await readFile(htmlPath, "utf-8");
            // Extract text content from HTML (basic: strip tags)
            const textContent = html
              .replace(/<script[\s\S]*?<\/script>/gi, "")
              .replace(/<style[\s\S]*?<\/style>/gi, "")
              .replace(/<nav[\s\S]*?<\/nav>/gi, "")
              .replace(/<header[\s\S]*?<\/header>/gi, "")
              .replace(/<footer[\s\S]*?<\/footer>/gi, "")
              .replace(/<[^>]+>/g, "")
              .replace(/&nbsp;/g, " ")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&#\d+;/g, "")
              .replace(/\n{3,}/g, "\n\n")
              .trim();

            if (textContent.length > 50) {
              const cleanPath = page.replace(/\/$/, "") || "home";
              const title = cleanPath
                .split("/")
                .filter(Boolean)
                .pop()
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "Home";
              fullLines.push(`---`);
              fullLines.push(`## ${title}`);
              fullLines.push(`Source: /${cleanPath}`);
              fullLines.push("");
              fullLines.push(textContent.slice(0, 10000));
              fullLines.push("");
            }
          } catch {
            // Page doesn't have index.html, skip
          }
        }

        await writeFile(
          join(outDir, "llms-full.txt"),
          fullLines.join("\n"),
          "utf-8",
        );

        console.log(
          `[llms-txt] Generated /llms.txt (${allPages.length} pages) and /llms-full.txt`,
        );
      },
    },
  };
}
