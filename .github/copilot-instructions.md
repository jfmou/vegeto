# Vegeto Codebase - AI Agent Instructions

## Project Overview
Vegeto is a static site generator for an aquaponics company website, built with **11ty (Eleventy)** as the core framework and **TinaCMS** as the headless CMS for content management. The site serves both marketing content and project case studies (realisations).

**Key Tech Stack:**
- **11ty** v3.1.2 - Static site generator (input: `src/`, output: `dist/`)
- **TinaCMS** v3.6.3 - Headless CMS with admin UI at `/admin`
- **Liquid** - Template language for layouts
- **Markdown** - Content format for realisations (case studies)
- **11ty Image Plugin** - Responsive image generation with WebP/AVIF

## Architecture & Data Flow

### Content Structure
- **Realisations** (case studies): Markdown files in `src/realisations/` with frontmatter
- **Layouts**: Liquid templates in `src/_includes/layouts/`
  - `base.liquid` - Main HTML wrapper
  - `realisation.liquid` - Case study template
- **Includes**: Reusable components in `src/_includes/`
  - `header.liquid`, `footer.liquid`, `realisation_layout.liquid`

### Frontmatter Schema (Realisations)
```yaml
title: Project name (required)
location: Geographic location (required)
baseline: Subtitle
mainImg: Primary image path (required)
tags: [realisation, conception, installation, transmission]
cta: {text, link}  # Call-to-action button
date: ISO timestamp
draft: boolean
```

### Build Pipeline
1. **Development**: `npm run dev` → TinaCMS + 11ty watch mode (localhost:8080)
2. **Production Build**: `npm run build`
  - Runs 11ty with asset pass-through
  - Copies `src/assets/` to `dist/assets/`
  - Copies `.htaccess` and `googlef7dc1ff0dc14bb58.html` in `dist/` (prod only)
3. **Beta Build**: `npm run build:beta`
  - Sets `ELEVENTY_BUILD_TARGET=beta`
  - Excludes `.htaccess` and Google verification file
  - Moves output from `dist/` to `beta/`

### Image Processing
- **Configuration**: [config/img.js](../config/img.js)
- **Widths**: 350px, 640px, 700px, 1280px (includes 2x variants)
- **Formats**: WebP, AVIF, JPEG (with lazy loading & async decoding)
- **Markdown Syntax**: `![alt](/path/image.jpg)`  with optional title
  - Special title format: `@skip[WxH] ?[sizes] caption`
  - `@skip` bypasses responsive processing (external URLs)
  - Examples in [config/markdown.js](../config/markdown.js)

## Developer Workflows

### Content Creation & Publishing
```bash
npm run dev              # Start dev server with admin UI
npm run save            # Create feature branch with current changes
npm run publish         # Push all branches to GitHub
npm run build           # Production build
npm run build:beta      # Beta build (output moved to ./beta)
```

**Workflow Pattern** (from README):
1. Edit in TinaCMS admin UI (http://localhost:8080/admin)
2. Save changes with `npm run save` (auto-creates `f/new-content-*` branch)
3. Publish with `npm run publish`
4. Merge PR on GitHub

### Branch Convention
- Feature branches: `f/new-content-[email-hash]-[timestamp]` (auto-created by save script)
- Main branch: `master`

## Project-Specific Patterns

### Markdown Customization
- Custom image renderer in [config/markdown.js](../config/markdown.js) for responsive images
- Overrides default markdown-it image processing
- Supports captions via `<figure>` elements
- External images handled without optimization

### Permalink Generation
- **Realisations only**: Forced lowercase slugs via `eleventyComputed.permalink`
- Pattern: `/realisations/{slug}/index.html`
- Defined in [.eleventy.js](../.eleventy.js)

### HTML Minification
- Configured via `@codestitchofficial/eleventy-plugin-minify` in [.eleventy.js](../.eleventy.js)

### CSS Architecture
- **Single stylesheet**: [src/assets/lib/style.css.liquid](../src/assets/lib/style.css.liquid)
- **CSS Variables** (root):
  - Colors: `--main-color`, `--main-active-color`, `--main-typo-color`, `--main-disabled-color`
  - Spacing: `--main-default-spacing: 20px`, `--main-p-spacing: 30px`
  - Header: `--header-default-height: 85px`
- **Responsive**: Mobile-first with media queries at 521px and 921px breakpoints
- **Decorative elements**: Borders and separators using `::after` pseudo-elements

## Critical Files Reference

| File | Purpose |
|------|---------|
| [.eleventy.js](../.eleventy.js) | Core 11ty config; image shortcode, permalink logic |
| [tina/config.ts](../tina/config.ts) | CMS schema definition; realisation fields & metadata |
| [config/markdown.js](../config/markdown.js) | Custom markdown image renderer; responsive syntax |
| [config/img.js](../config/img.js) | Image generation params (widths, formats, paths) |
| [src/_includes/layouts/base.liquid](../src/_includes/layouts/base.liquid) | HTML5 template; meta tags, stylesheet includes |
| [src/assets/lib/style.css.liquid](../src/assets/lib/style.css.liquid) | All styling; CSS variables; responsive breakpoints |

## Important Constraints & Gotchas

1. **Deploy Files (Prod only)**: `.htaccess` and `googlef7dc1ff0dc14bb58.html` are copied to `dist/` only when `ELEVENTY_BUILD_TARGET != beta`
2. **Liquid Syntax**: `dynamicPartials: false` (set explicitly in .eleventy.js) - include paths must be static
3. **Image Alt Text**: Markdown image renderer throws error if `alt=""` missing (empty string OK, missing fails)
4. **Slug Format**: Realisations use lowercase permalinks; file names with mixed case will be lowercased in URL
5. **TinaCMS Media Root**: Points to `src/assets/img/` (relative to public folder `dist/`)

## Node Version Requirement
- **Node.js ≥ 24.0.0** (LTS, from package.json engines)
- Install via nvm: `nvm install --lts`

## Common Tasks

**Add a new realisation**: Create `.md` file in `src/realisations/` with required frontmatter fields
**Update styling**: Edit [src/assets/lib/style.css.liquid](../src/assets/lib/style.css.liquid) with CSS variables
**Add custom image**: Use markdown syntax with optional responsive parameters
**Build beta output**: `npm run build:beta` (writes to `./beta`)
**Debug 11ty**: `npm run debug` (verbose output via DEBUG env var)
