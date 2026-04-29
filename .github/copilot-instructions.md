# Scramjet OSS Guidelines for GitHub Copilot

When generating code or reviewing PRs for this repository, adhere to the following principles:

1. **Framework Context**: This is a Cloudflare-native repository. Assume edge execution environments.
2. **Styling**: Always use Tailwind utility classes.
3. **Type Safety**: Enforce strict TypeScript rules.
4. **Commit Messages**: If generating commit messages, they MUST follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`).

When reviewing a PR, look out for:
- Missing types or excessive use of `any`.
- Accidental inclusion of Node.js specific modules in edge-runtime code.
- Unoptimized Tailwind classes.
