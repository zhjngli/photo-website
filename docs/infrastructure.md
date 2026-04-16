# Infrastructure Guide

This document is a current-state maintenance guide for the `photo-website` repo. It is intended to answer "how does this build and deploy today?" and "what should I check before changing build or deployment infrastructure?"

## Overview

- App type: static single-page photo portfolio deployed on Netlify
- Main frontend stack: React 16 with `preact/compat` aliases, TypeScript, webpack 5, Sass modules
- Main output flow: source assets in `src/` are bundled into `dist/`, with a small set of static and copied files added during the build
- Primary deploy target: Netlify

Important current-state note:
- the site uses a custom generated service worker for same-origin offline caching
- service-worker generation is part of the production build, not a Workbox plugin

The worker is generated instead of being a fully static hand-written file because webpack output and asset paths depend on the build. Generating it keeps the offline asset list in sync without reintroducing Workbox.

## Build And Deploy

### Local build flow

- Main production build command: `npm run build`
- That runs:
  - `npm run create-photos`
  - `webpack --mode production`
- Dev server command: `npm run start`

### Generated photos step

- [`scripts/create-photos.js`](../scripts/create-photos.js) scans `src/assets/photos/*.jpg`
- It creates missing `.webp` versions
- It rewrites [`src/photos/index.ts`](../src/photos/index.ts) with imports, dimensions, hashes, and gallery metadata

This means:
- `src/photos/index.ts` is generated content, not hand-maintained content
- build and dev commands may modify it locally

### Netlify deploy flow

- Netlify build config lives in [`netlify.toml`](../netlify.toml)
- Current build command: `npm run-script build`
- Current publish dir: `dist/`
- Current Netlify Node runtime pin: `22`

Current repo-managed deploy config:
- build command and publish dir
- Netlify Node runtime
- redirects
- security headers

Current Netlify UI-managed operational config:
- Lighthouse build plugin
- Netlify Prerender extension
- GitHub required status checks / deploy checks
- secrets and environment variables not committed to the repo

## Runtime And Dependency Notes

### Runtime expectations

- [`package.json`](../package.json) declares `"node": "^20.9.0 || >=22.0.0"`
- Netlify is pinned to `NODE_VERSION = "22"` in [`netlify.toml`](../netlify.toml)
- There is intentionally no `.nvmrc` file right now

Current runtime policy:
- the repo declares a supported Node range in `package.json`
- Netlify deploys are made reproducible by pinning Node major version `22` in `netlify.toml`
- local development is not pinned by a repo-level shell file

### Build tooling table

| Tool or dependency | Role | Where it matters | Risk if changed | Notes |
| --- | --- | --- | --- | --- |
| `webpack` | Main bundler | [`webpack.config.js`](../webpack.config.js), build output | High | Core build pipeline |
| `webpack-cli` | CLI entry for webpack | `npm run build`, `npm run start` | Medium | Must stay compatible with webpack and dev server |
| `webpack-dev-server` | Local dev server | `npm run start` | Medium | Requires modern Node |
| `babel-loader` + Babel presets/plugins | TS/JS/JSX transpilation | TS/React source compilation | High | Build breaks quickly if Babel config and packages drift |
| `copy-webpack-plugin` | Copies static assets into `dist/` | `robots.txt`, favicons, resume, self-hosted images, social image | High | Modern versions require newer Node |
| `html-webpack-plugin` | Renders `public/index.html` into final HTML | app shell, meta tags, preload tags | High | Drives HTML template output |
| `mini-css-extract-plugin` | Extracts CSS in production | final CSS output | Medium | Affects prod CSS emission |
| `css-minimizer-webpack-plugin` | Minifies CSS | production optimization | Medium | Security-sensitive path during recent hardening |
| `terser-webpack-plugin` | Minifies JS | production optimization | Medium | Security-sensitive path during recent hardening |
| `sass` + `sass-loader` | Compiles `.scss` modules | component/page styles | Medium | Current build still emits Sass deprecation warnings |
| `preact` | React compatibility target | webpack aliases for `react` and `react-dom` | Medium | Used for bundle-size optimization; changing this affects framework behavior |
| `react-photo-gallery` | Main gallery rendering dependency | photo grid and image presentation | High | Core site functionality, not just build infrastructure |
| `webp-converter`, `image-size`, `sha1` | Photo preprocessing helpers | `scripts/create-photos.js` | Low to medium | Affect generated `src/photos/index.ts` and asset variants |

### Other dependency notes

- `@types/react-netlify-form` and `@types/webpack-env` remain in the manifest even though they were not clearly required during the security pass
- They were intentionally left in place because they were not part of the active security path
- `react`, `react-dom`, `react-router-dom`, and `preact` are a more coupled stack and should be changed carefully

## Output And Generated Assets

### HTML shell and metadata

- The HTML shell template is [`public/index.html`](../public/index.html)
- It contains:
  - Open Graph tags
  - Twitter tags
  - font preload tags
  - favicon and manifest links
  - the hidden Netlify contact form bootstrap markup
  - the Google Analytics script include

Current behavior:
- these tags are static template content, not generated by separate webpack meta/preload plugins

### Robots and copied static files

- [`public/robots.txt`](../public/robots.txt) is the source of the deployed `robots.txt`
- Current policy is:
  - `User-agent: *`
  - `Disallow:`

Static/copied files are handled by [`copy-webpack-plugin`](../webpack.config.js) patterns:
- `public/robots.txt`
- social/meta image from `src/assets/meta`
- favicons from `src/assets/favicons`
- `resume.pdf`
- self-hosted images under `src/assets/self-hosted`

### Fonts and images

- Photos are emitted as webpack asset resources
- Fonts are emitted under `dist/fonts/`
- Font preload links in `public/index.html` use `htmlWebpackPlugin.options.assetPath` so they respect webpack public path changes

### Current PWA-related state

- `public/index.html` links a web manifest and touch icons
- [`src/index.tsx`](../src/index.tsx) registers the service worker in production
- the production build generates `dist/service-worker.js` from [`scripts/create-service-worker.js`](../scripts/create-service-worker.js)
- the service worker caches same-origin app shell and portfolio assets for offline use

The site therefore keeps installability-related metadata and an active custom offline-cache layer, without relying on Workbox.

## Netlify Operational Notes

### Runtime and build reproducibility

- Netlify Node runtime is pinned in [`netlify.toml`](../netlify.toml)
- This exists because recent dependency upgrades required a newer runtime than older Netlify/project defaults
- The repo no longer uses `.nvmrc`

### Lighthouse

- Lighthouse is currently managed in the Netlify UI as a build plugin
- It is not declared in `package.json`
- It is not declared as a `[[plugins]]` entry in `netlify.toml`

Implication:
- plugin versioning/debugging may require checking Netlify UI state, not only repo state

### Prerender

- Netlify Prerender is currently UI-managed as an extension
- It is not configured in `netlify.toml`
- Extension/runtime failures may come from Netlify-managed installation steps under `.netlify/plugins/`, not from the app build itself

### Required checks

- Netlify deploy/status checks can be used as required GitHub merge checks
- The useful gating check is the PR deploy preview / Netlify check, not a post-merge production deploy

## Change Checklist

Before changing dependency, build, or deploy infrastructure, check these first:

- If changing Node/runtime expectations:
  - [`package.json`](../package.json)
  - [`netlify.toml`](../netlify.toml)
  - Netlify site `Dependency management` runtime setting
- If changing build output or static assets:
  - [`webpack.config.js`](../webpack.config.js)
  - [`public/index.html`](../public/index.html)
  - [`public/robots.txt`](../public/robots.txt)
- If changing photo ingestion/output:
  - [`scripts/create-photos.js`](../scripts/create-photos.js)
  - [`src/photos/index.ts`](../src/photos/index.ts)
- If changing Netlify behavior:
  - repo config in [`netlify.toml`](../netlify.toml)
  - Netlify UI plugin/extension settings
  - required GitHub status checks
- If changing performance/PWA-related behavior:
  - current metadata in [`public/index.html`](../public/index.html)
  - current service-worker registration and generated asset list in [`src/index.tsx`](../src/index.tsx) and [`scripts/create-service-worker.js`](../scripts/create-service-worker.js)
  - current Netlify Lighthouse and Prerender UI-managed settings
- If changing service-worker behavior:
  - [`scripts/create-service-worker.js`](../scripts/create-service-worker.js)
  - [`src/index.tsx`](../src/index.tsx)
  - local offline verification from a static server after `npm run build`
