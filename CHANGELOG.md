# Changelog

## 1.0.0 (2026-05-14)


### Features

* add inline interactive API playground component ([99eefa9](https://github.com/scramjetio/flight-manual/commit/99eefa955bbae5b5948265cfd011b4e7f77b8586))
* add MCP Server Auto-gen pipeline ([9bc10fe](https://github.com/scramjetio/flight-manual/commit/9bc10fefe7c9c2021078bcd017c1b343a59ad3c5))
* complete enterprise modernization (RBAC, AI Agent, CI/CD, Premium UI) ([a7cfb24](https://github.com/scramjetio/flight-manual/commit/a7cfb24b1edfcf62c3af896326ee8fc00552f0e0))
* complete low-hanging fruit (i18n, API key auth, SDK samples) ([0a482de](https://github.com/scramjetio/flight-manual/commit/0a482de81bd5919f1a188fcd5cc785793ed25105))
* expand component library and implement content versioning with starlight-versions ([b449ee0](https://github.com/scramjetio/flight-manual/commit/b449ee060af59da078dedd84d157a73d0c10d90f))
* **homepage:** inject AI Chatbot and Interactive API Playground directly into the live demo homepage ([8f16971](https://github.com/scramjetio/flight-manual/commit/8f16971e73d1459fe6ee1f243fb609daa3858f53))
* inject InlinePlayground into Zod codegen pipeline ([742217a](https://github.com/scramjetio/flight-manual/commit/742217a9163e2b6871d910cd8d91c2b11f4dd4ef))
* redesign homepage to mintlify-tier aesthetic with glassy cards and custom glow css ([93f55a5](https://github.com/scramjetio/flight-manual/commit/93f55a5ce92478a7078b779b5506d205e172f831))


### Bug Fixes

* **chatbot:** wrap ChatWidget in TooltipProvider to prevent React crash upon opening ([3867c6e](https://github.com/scramjetio/flight-manual/commit/3867c6e5d08518e7da9c57fcc8d636d1b122fb4c))
* correct starlight editLink baseUrl to prevent duplicate paths resulting in 404s ([8a4e998](https://github.com/scramjetio/flight-manual/commit/8a4e9980c3c98343467bceb165c5dafaa78ad1f9))
* remove bad card background color in light mode to restore text legibility ([bf0fc00](https://github.com/scramjetio/flight-manual/commit/bf0fc00a787974b2e27a762e1b3c21e482aa6723))
* remove hardcoded grayscale variables to restore Starlight native Light Mode accessibility ([ec137a6](https://github.com/scramjetio/flight-manual/commit/ec137a64a0dfbb18ade11d97c5754df9aeebea38))
* replace deprecated GroupedParts with Parts in assistant-ui thread ([a7acda7](https://github.com/scramjetio/flight-manual/commit/a7acda79614138a9ea41d632da1ebcef706ba5f7))
* scope mintlify glow effects exclusively to dark mode to prevent light mode illegibility ([20a7739](https://github.com/scramjetio/flight-manual/commit/20a77391b2c595c304b6c54e6eb170683602351e))
* sync tailwind dark mode with starlight theme toggle to restore shadcn text legibility ([7dd0947](https://github.com/scramjetio/flight-manual/commit/7dd0947f55b6921bb7a23aebf591bf6cb0924065))
