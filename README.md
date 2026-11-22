# Portfolio Website

A Notion-inspired personal portfolio for Koji, built with React and TypeScript. It presents work experience, personal projects, skills, and contact details, and ships with an interactive terminal at `/terminal`.

Live site: [koji.thedev.id](https://koji.thedev.id)

## Features

- **Single-page portfolio**: Hero, About, Work Projects, Personal Projects, and Contact sections with smooth hash navigation and lazy-loaded sections
- **Interactive terminal**: A `/terminal` route powered by [hakoniwa-term](https://github.com/koji/hakoniwa-term), with commands for browsing projects, navigating sections, and switching terminal themes
- **Responsive design**: Notion-inspired layout that adapts to desktop, tablet, and mobile
- **Accessibility**: Skip link, keyboard-friendly navigation, focus styles, and semantic landmarks
- **Data-driven content**: Projects and tech stack live in `src/data`
- **SEO and sharing**: Sitemap and robots.txt via `vite-plugin-sitemap`, Open Graph and Twitter meta tags, and an `llm.txt` summary
- **Security headers**: CSP, HSTS, frame protection, and cache headers configured in `vercel.json`
- **Analytics**: Cookieless Umami tracking

## Tech Stack

- **Core**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Routing**: react-router-dom 6
- **Styling**: TailwindCSS 3
- **UI Components**: shadcn/ui patterns with Radix UI Slot, class-variance-authority, and tailwind-merge
- **Icons**: lucide-react
- **Terminal**: hakoniwa-term
- **Linting and Formatting**: Oxlint and Oxfmt
- **Testing**: Vitest, Testing Library, jsdom
- **Deployment**: Vercel

## Requirements

- Node.js 24.22.1 and Bun 1.4.0 (pinned in `mise.toml`)

Using [mise](https://mise.jdx.dev/) is optional but will install both versions:

```shell
mise install
```

## Installation

```shell
# Clone the repository
git clone https://github.com/koji/website.git
cd website

# Install dependencies via bun
bun install
```

## Available Scripts

```shell
# Start development server (http://localhost:8080)
bun run dev

# Build for production
bun run build

# Build for development
bun run build:dev

# Lint code
bun run lint

# Lint and apply safe fixes
bun run lint:fix

# Format code
bun run fmt

# Check formatting
bun run fmt:check

# Preview production build
bun run preview

# Run tests in watch mode
bun run test

# Run tests once
bun run test:run

# Run React Doctor checks
bun run doctor
```

## Development

1. Start the development server:

   ```bash
   bun run dev
   ```

2. Open your browser and visit [http://localhost:8080/](http://localhost:8080/)

3. Edit files in `src` to see live updates. The terminal page is at [http://localhost:8080/terminal](http://localhost:8080/terminal)

### Project Structure

```text
src/
  components/     Page sections, navigation, and shared UI
  components/ui/  shadcn-style primitives
  data/           Work projects, personal projects, and tech stack data
  pages/          Index page, terminal page, and 404
  terminal/       Terminal commands and theme definitions
  types/          Shared types
```

`DESIGN.md` documents the Notion-inspired design system. `public/llm.txt` provides a short project summary for language models.

## Deployment

The project deploys to Vercel. `vercel.json` rewrites `/terminal` to the SPA entry point and sets security and cache headers.

Build the project for production:

```bash
bun run build
```

The build artifacts are stored in `dist/`.

## CI

- **Lint and Test** (`.github/workflows/lint-test.yml`): runs lint, tests, and build on pushes and pull requests to `main`
- **React Doctor** (`.github/workflows/react-doctor.yml`): scans changed files and `main` for React issues
- **CodeSee** (`.github/workflows/codesee-arch-diagram.yml`): generates an architecture diagram

## License

This is a personal portfolio project. No license is provided.

---

Made with ❤️ by koji
