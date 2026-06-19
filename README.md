<div align="center">

<a id="readme-top"></a>

<p align="center">
  <img src="docs/assets/logo.png" alt="Perplexity WebUI Search" width="160"/>
</p>

[![License: MIT](https://img.shields.io/github/license/Sofian-bll/pplx-web-query?style=flat)](https://github.com/Sofian-bll/pplx-web-query/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/Sofian-bll/pplx-web-query?style=flat)](https://github.com/Sofian-bll/pplx-web-query/releases)
[![Stars](https://img.shields.io/github/stars/Sofian-bll/pplx-web-query?style=flat)](https://github.com/Sofian-bll/pplx-web-query/stargazers)

</div>

<h1 align="center">Perplexity WebUI Search</h1>

<p align="center">
  A portable Agent Skill that queries Perplexity through its web UI using Playwright browser automation — no API key required.
</p>

> [Read in English](README.md) | [Lire en Français](README.fr.md)

<details open>
<summary>Table of Contents</summary>

- [What is this?](#what-is-this)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Output Format](#output-format)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

</details>

## What is this?

A universal Agent Skill that lets any AI coding agent (OpenCode, Claude Code, Codex CLI) perform web searches through Perplexity's interface. It opens Chromium, navigates to perplexity.ai, submits a query, captures the generated answer, and writes it to a Markdown file.

No API key. No subscription. Just browser automation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- **Browser automation** — Launches Chromium, navigates Perplexity, submits queries
- **Answer extraction** — Clicks "Copy" on the generated response, reads the clipboard
- **Retry logic** — Handles empty clipboard, slow responses, and transient failures (3 retries)
- **Markdown output** — Saves answers to `.md` files with clean formatting
- **Multi-agent support** — Works with OpenCode, Claude Code, and Codex CLI out of the box
- **Progress logging** — Stderr for logs, stdout for clean output — pipe-friendly

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- Chromium browsers for Playwright

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How It Works

```mermaid
flowchart TD
    A[Launch Chromium] --> B[Navigate to perplexity.ai]
    B --> C[Type query in search input]
    C --> D[Submit and wait for answer]
    D --> E[Click Copy button]
    E --> F[Read clipboard]
    F --> G{Clipboard empty?}
    G -->|Yes| H[Retry up to 3 times]
    H --> E
    G -->|No| I[Write answer to .md file]
    I --> J[Print to stdout]
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Quick Start

```bash
cd skills/perplexity-webui-search
npm install
npx playwright install chromium
npm run search -- "What are the latest Playwright changes?" ./result.md
```

The command opens Chromium, sends the prompt to Perplexity, copies the answer, saves it to `result.md`, and prints it to stdout.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### As an Agent Skill

Install into your agent's skill directory:

**OpenCode:**

```bash
npx skills add ./skills --skill perplexity-webui-search --agent opencode --copy
```

Or copy `skills/perplexity-webui-search/` into `~/.config/opencode/skills/`.

**Codex CLI:**

```bash
npx skills add ./skills --skill perplexity-webui-search --agent codex --copy
```

**Claude Code and others:**

Copy `skills/perplexity-webui-search/` into your agent's skills directory.

### Direct CLI

From the skill directory:

```bash
node scripts/perplexity-query.js "your query here" ./output.md
```

### Checks

```bash
npm test              # Run unit tests
npm run check         # Syntax validation
npm run pack:dry-run  # Verify publish-ready package
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Output Format

Answers are saved as plain Markdown with preserved formatting from Perplexity. The clipboard content is written verbatim to the output file.

```bash
npm run search -- "What is Rust?" ./rust-overview.md
# → rust-overview.md contains the full Perplexity answer
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```text
skills/
  perplexity-webui-search/
    scripts/
      perplexity-core.js         # Core: args, retry, Playwright automation
      perplexity-core.test.mjs   # Unit tests
      perplexity-query.js         # CLI entry point
    references/
      install-opencode.md
      install-codex.md
      install-claude.md
      troubleshooting.md
    LICENSE
    README.md
    SKILL.md
    package.json
docs/
  assets/
    logo.png
.env
.gitignore
LICENSE
README.md
README.fr.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/playwright-%2345ba4b?style=flat&logo=playwright&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=flat&logo=git&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are welcome. This is a public project — fork, branch, and open a PR.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

<a href="https://github.com/Sofian-bll/pplx-web-query/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Sofian-bll/pplx-web-query" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Sofian-bll/pplx-web-query&type=Date)](https://star-history.com/#Sofian-bll/pplx-web-query&Date)

</div>

<!-- REFERENCE_LINKS -->
[node.js]: https://nodejs.org/
[playwright]: https://playwright.dev/
