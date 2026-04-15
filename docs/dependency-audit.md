# Dependency Audit

## Scope

This audit starts from direct dependencies and devDependencies declared in `package.json`, plus repo-level runtime and deploy configuration that materially affects upgradeability. It includes transitive dependencies only when they explain a direct dependency's security risk, peer conflict, legacy drag, or output sensitivity.

## Method

Each dependency is evaluated for:

- primary role in this repo
- direct repo evidence showing where it is used
- user-visible output sensitivity
- build and deploy sensitivity
- future upgrade drag
- maintenance burden
- recommended disposition

Output stability is the default priority. Build and deploy viability are required secondary constraints.

## Build Core

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| webpack | dependency | ^5.94.0 | Bundler and config runtime behind `npm run build` and `npm run start` | `package.json:10,18,80`, `webpack.config.js:176-277` | high | high | medium | high | none | keep |
| webpack-cli | dependency | ^5.1.4 | CLI wrapper for `webpack` and `webpack serve` scripts | `package.json:10,18,82` | low | medium | medium | medium | `npm ls webpack-cli --all` shows `@webpack-cli/serve@2.0.5`; this was already part of the `webpack-dev-server@5` compatibility path | keep but watch |
| webpack-dev-server | dependency | ^5.2.3 | Local HTTPS dev server behind `npm run start` | `package.json:18,83`, `webpack.config.js:270-275` | low | low | medium | medium | none | keep but watch |

## Build Plugins And Loaders

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| copy-webpack-plugin | dependency | ^9.0.1 | Copies favicons, resume, and self-hosted assets into `dist` | `package.json:50`, `webpack.config.js:2,25-52` | high | high | high | medium | `npm audit --omit=dev --json` reports a current high-severity path via `serialize-javascript`, with the first fix at `copy-webpack-plugin@14` | keep but watch |
| html-webpack-plugin | dependency | ^5.5.0 | Creates `index.html` from the public template and favicon/meta wiring | `package.json:54`, `webpack.config.js:3,58-66` | high | high | medium | medium | none | keep |
| html-webpack-tags-plugin | dependency | ^2.0.17 | Injects Open Graph and Twitter meta tags into the generated HTML | `package.json:55`, `webpack.config.js:4,67-147` | high | medium | medium | medium | none | replace later |
| mini-css-extract-plugin | dependency | ^1.3.0 | Extracts production CSS bundles and switches loader behavior by mode | `package.json:57`, `webpack.config.js:5,54-57,208` | high | high | medium | medium | none | keep |
| css-minimizer-webpack-plugin | dependency | ^3.4.1 | Minifies emitted CSS in production | `package.json:52`, `webpack.config.js:6,253-257` | medium | high | high | medium | `npm audit --omit=dev --json` reports a current high-severity path via `serialize-javascript`, with the first fix at `css-minimizer-webpack-plugin@8` | keep but watch |
| file-loader | dependency | ^6.2.0 | Emits image and font assets from webpack modules | `package.json:53`, `webpack.config.js:191-203` | high | high | high | medium | none | replace later |
| preload-webpack-plugin | dependency | ^3.0.0-beta.3 | Preloads font assets for first paint | `package.json:63`, `webpack.config.js:7,149-154` | medium | medium | high | medium | none | replace later |
| robotstxt-webpack-plugin | dependency | ^8.0.0 | Generates an allow-all `robots.txt` during the webpack build | `package.json:70`, `webpack.config.js:8,161-169` | medium | low | medium | low | none | remove candidate |
| terser-webpack-plugin | dependency | ^5.3.11 | Minifies JavaScript output in production | `package.json:75`, `webpack.config.js:9,249-257` | medium | high | medium | medium | none | keep |
| workbox-webpack-plugin | dependency | ^6.0.2 | Generates the service worker for offline and cache behavior | `package.json:84`, `webpack.config.js:10,155-160` | high | high | high | medium | `npm audit --omit=dev --json` shows an active high-severity chain through `workbox-build` -> `rollup-plugin-terser` -> `serialize-javascript`, with the first fix at `workbox-webpack-plugin@7.4.0` | investigate |
| webpack-bundle-analyzer | dependency | ^4.4.0 | Optional bundle inspection gated by `BUNDLE_ANALYZE` | `package.json:9,81`, `webpack.config.js:11,172-173` | none | low | low | low | none | keep |

## Babel And TypeScript

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| @babel/core | dependency | ^7.12.3 | Babel compiler core for the TSX-to-browser build pipeline | `package.json:36`, `babel.config.js:1-4`, `webpack.config.js:183-188` | medium | high | medium | medium | none | keep |
| @babel/plugin-proposal-object-rest-spread | dependency | ^7.12.1 | Explicit object rest/spread plugin kept in Babel config under the legacy alias `@babel/proposal-object-rest-spread` | `package.json:37`, `babel.config.js:3` | medium | medium | high | medium | `npm ls @babel/plugin-transform-object-rest-spread @babel/preset-env --all` shows `@babel/preset-env` already brings the transform plugin into the tree | investigate |
| @babel/plugin-transform-class-properties | dependency | ^7.28.6 | Explicit class-properties plugin for the current Babel config | `package.json:38`, `babel.config.js:3` | medium | medium | high | medium | `npm ls @babel/plugin-transform-class-properties @babel/preset-env --all` shows `@babel/preset-env` already brings this transform into the tree | investigate |
| @babel/plugin-transform-runtime | dependency | ^7.17.0 | Reuses Babel helpers/runtime code in emitted JS, configured via the legacy alias `@babel/transform-runtime` | `package.json:39`, `babel.config.js:3` | low | medium | medium | medium | none | keep but watch |
| @babel/preset-env | dependency | ^7.12.1 | Browser-targeted Babel preset driven by `browserslist` | `package.json:40`, `babel.config.js:2`, `package.json:20-30` | high | high | medium | medium | none | keep |
| @babel/preset-react | dependency | ^7.12.5 | JSX transform preset for Preact/React-compatible components | `package.json:41`, `babel.config.js:2`, `webpack.config.js:245-246` | high | high | medium | medium | none | keep |
| @babel/preset-typescript | dependency | ^7.12.7 | Strips TypeScript syntax during Babel compilation | `package.json:42`, `babel.config.js:2`, `webpack.config.js:183-188` | high | high | medium | medium | none | keep |
| babel-loader | dependency | ^8.2.1 | Feeds `.tsx` through Babel in webpack | `package.json:49`, `webpack.config.js:183-188` | high | high | medium | medium | none | keep |
| ts-loader | dependency | ^8.0.11 | Unused TS webpack loader; current config relies on `babel-loader` instead | `package.json:76`, `webpack.config.js:183-188` | none | low | low | low | none | remove candidate |
| typescript | dependency | ^3.9.7 | Type checker for `npm run lint` and the repo `tsconfig.json` | `package.json:15,77`, `tsconfig.json:1-20` | none | medium | high | medium | none | investigate |
| @types/node | dependency | ^12.19.4 | Node and `process` typings used by the TypeScript toolchain | `package.json:43`, `src/serviceWorkerRegistration.ts:27`, `tsconfig.json:1-20` | none | low | medium | low | none | keep but watch |
| @types/react | dependency | ^16.9.56 | React typings for TSX component type-checking | `package.json:44`, `src/index.tsx:1`, `src/page/index.tsx:1` | none | low | medium | low | none | keep |
| @types/react-dom | dependency | ^16.9.9 | React DOM typings for the client render entrypoint | `package.json:45`, `src/index.tsx:2,23` | none | low | medium | low | none | keep |
| @types/react-router-dom | dependency | ^5.1.6 | Router typings for typed route and link usage | `package.json:47`, `src/page/index.tsx:2`, `src/components/header/index.tsx:2` | none | low | medium | low | none | keep |
| @types/webpack-env | dependency | ^1.15.3 | Manifest-only ambient webpack typings; no confirmed code-level usage in `src` | `package.json:48`, `tsconfig.json:1-20` | none | low | medium | low | none | investigate |

## Styling Pipeline

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| css-loader | dependency | ^5.0.1 | Resolves CSS modules in the webpack style chain | `package.json:51`, `webpack.config.js:206-215` | high | high | medium | medium | none | keep |
| postcss-flexbugs-fixes | dependency | ^5.0.2 | PostCSS plugin for CSS flexbox bug workarounds | `package.json:58`, `webpack.config.js:217-227,221-222` | medium | medium | medium | low | none | keep |
| postcss-loader | dependency | ^4.2.0 | Runs PostCSS during SCSS module compilation | `package.json:59`, `webpack.config.js:216-230` | high | high | medium | medium | none | keep |
| postcss-preset-env | dependency | ^7.4.0 | Enables modern CSS features and autoprefixing in the build | `package.json:60`, `webpack.config.js:217-227,222-226` | high | high | medium | medium | none | keep |
| postcss-safe-parser | dependency | ^5.0.2 | Parser passed to CSS minimization for safer handling | `package.json:61`, `webpack.config.js:12,253-256` | medium | high | low | low | none | keep |
| sass | dependency | ^1.83.0 | SCSS compiler for module styles | `package.json:71`, `webpack.config.js:232-237` | high | high | high | medium | none | keep but watch |
| sass-loader | dependency | ^10.1.0 | Feeds SCSS into the webpack style pipeline | `package.json:72`, `webpack.config.js:232-237` | high | high | medium | medium | none | keep but watch |
| style-loader | dependency | ^2.0.0 | Injects styles during development when CSS is not extracted | `package.json:74`, `webpack.config.js:205-214,208` | medium | medium | low | low | none | keep |

## App And Runtime

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| preact | dependency | ^10.5.12 | Actual shipped compatibility runtime behind the webpack `react` and `react-dom` aliases | `package.json:62`, `webpack.config.js:245-246`, `src/index.tsx:1-2` | high | medium | high | medium | none | investigate |
| react | dependency | ^16.14.0 | Source-level React API surface that webpack resolves to `preact/compat` at build time | `package.json:64`, `src/index.tsx:1,23`, `src/page/index.tsx:1,24-37`, `webpack.config.js:245-246` | high | high | high | medium | none | investigate |
| react-dom | dependency | ^16.14.0 | Source-level DOM renderer import that webpack resolves to `preact/compat` in the final bundle | `package.json:65`, `src/index.tsx:2,23`, `webpack.config.js:245-246` | high | high | high | medium | none | investigate |
| react-router-dom | dependency | ^5.2.0 | Client-side routing for page navigation and links, using several v5-era APIs | `package.json:69`, `src/page/index.tsx:2,24-35`, `src/components/header/index.tsx:2,19-22`, `src/components/gallery/galleryImage.tsx:4` | high | high | high | medium | none | investigate |
| react-photo-gallery | dependency | ^8.0.0 | Gallery layout and image render props for the photo grid | `package.json:68`, `src/components/gallery/index.tsx:3,56-63`, `src/components/gallery/galleryImage.tsx:3`, `src/photos/index.ts:40`, `scripts/create-photos.js:49` | high | high | medium | medium | none | keep but watch |
| react-fade-in | dependency | ^2.0.1 | Fade-in animation wrapper used around gallery and content blocks | `package.json:66`, `src/components/gallery/index.tsx:2,54-66`, `src/components/gallery/galleryImage.tsx:2,41-53`, `src/components/content/about.tsx:2`, `src/components/content/contact.tsx:2` | medium | low | low | low | none | keep |
| react-google-recaptcha | dependency | ^2.1.0 | reCAPTCHA widget used by the Netlify form wrapper | `package.json:67`, `src/components/netlifyForm/index.tsx:2,8,47-63,77-110` | medium | medium | medium | medium | none | keep but watch |
| @types/react-netlify-form | dependency | ^2.1.0 | Manifest-only type package with no confirmed import in repo code | `package.json:46` | none | low | medium | low | none | remove candidate |
| web-vitals | dependency | ^1.1.0 | Web performance metric reporter wired into analytics | `package.json:78`, `src/reportWebVitals.ts:1-11`, `src/index.tsx:6,30-52` | low | low | low | low | none | keep |
| image-size | dependency | ^0.9.3 | Reads JPEG dimensions while generating the photo manifest | `package.json:56`, `scripts/create-photos.js:3,66-75` | medium | medium | low | low | none | keep |
| webp-converter | dependency | ^2.3.1 | Converts JPEG source photos into WebP during photo generation | `package.json:79`, `scripts/create-photos.js:2,30-40` | high | high | medium | medium | none | keep but watch |
| sha1 | dependency | ^1.1.1 | Generates stable short hashes for generated photo metadata | `package.json:73`, `scripts/create-photos.js:4,17-18` | low | medium | low | low | none | keep |

## Quality And Tooling

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| eslint | devDependency | ^7.19.0 | Main lint runner for `npm run lint` and repo rules enforcement | `package.json:15,89`, `.eslintrc.js:1-30` | none | low | high | medium | none | investigate |
| @typescript-eslint/eslint-plugin | devDependency | ^4.13.0 | TypeScript lint rules provider for the ESLint config | `package.json:87`, `.eslintrc.js:9,20,27-29` | none | low | high | medium | none | investigate |
| @typescript-eslint/parser | devDependency | ^4.13.0 | ESLint parser for TypeScript and TSX files | `package.json:88`, `.eslintrc.js:12,20` | none | low | high | medium | none | investigate |
| eslint-config-prettier | devDependency | ^7.1.0 | Disables ESLint rules that conflict with Prettier | `package.json:90`, `.eslintrc.js:10` | none | low | low | low | none | keep |
| eslint-plugin-prettier | devDependency | ^3.3.1 | Runs Prettier through ESLint's recommended integration | `package.json:91`, `.eslintrc.js:10,20` | none | low | low | low | none | keep |
| eslint-plugin-react | devDependency | ^7.22.0 | React lint rules for JSX and component patterns | `package.json:92`, `.eslintrc.js:8,20` | none | low | low | low | none | keep |
| eslint-plugin-simple-import-sort | devDependency | ^7.0.0 | Import/export ordering rules used by the lint config | `package.json:93`, `.eslintrc.js:20,28-29` | none | low | low | low | none | keep |
| prettier | devDependency | ^2.2.1 | Formatter used by lint and ESLint integration | `package.json:15,94`, `.eslintrc.js:10`, `.prettierrc:1-10` | none | low | medium | medium | none | keep but watch |

## Deploy And Environment

| Dependency | Type | Current Range | Role | Repo Evidence | Output Sensitivity | Build/Deploy Sensitivity | Upgrade Drag | Maintenance Burden | Transitive Context | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| package.json engines.node | repo/runtime config | >=18.12.0 | Project Node runtime floor for scripts, local dev, and build compatibility | `package.json:5-7,10,15,18` | none | high | high | low | none | keep but watch |
| .nvmrc | repo/runtime config | 18.12.0 | Local Node version pin for contributors | `.nvmrc:1` | none | high | high | low | none | keep but watch |
| netlify.toml build environment | repo/runtime config | NODE_VERSION=18.12.0; command=`npm run-script build`; publish=`dist/`; NODE_ENV=production | `netlify.toml:1-10` | none | high | high | medium | none | keep but watch |

## Phase 0: Freeze Expectations

- Verify the homepage, gallery, carousel, about, contact, shop, and not-found routes still render.
- Diff the generated `dist/` assets for copied favicons, resume, photos, fonts, CSS bundles, and `index.html`.
- Check SEO output for `robots.txt`, Open Graph meta tags, and Twitter meta tags.
- Confirm service worker generation still registers and precache behavior still matches the existing offline/cache path.
- Confirm local and Netlify builds still use Node `18.12.0` and the `npm run-script build` deployment command.

## Phase 1: Low-Risk Removals

### ts-loader
- Why now: The webpack config already uses `babel-loader` for `\.tsx?$`, so `ts-loader` is manifest-only drag.
- Expected benefit: Reduces dead dependency surface and removes one outdated TypeScript webpack integration path.
- Output risk: low
- Build/deploy risk: low
- Reviewability: easy
- Recommendation strength: strong

### @types/react-netlify-form
- Why now: The catalog found no confirmed code-level import, only a manifest entry.
- Expected benefit: Removes an unneeded ambient package and trims type-dependency noise.
- Output risk: low
- Build/deploy risk: low
- Reviewability: easy
- Recommendation strength: strong

### robotstxt-webpack-plugin
- Why now: The generated `robots.txt` currently just allows all crawlers, so the plugin has limited functional value.
- Expected benefit: Simplifies the build plugin set and removes one legacy webpack-era plugin.
- Output risk: low
- Build/deploy risk: low
- Reviewability: easy
- Recommendation strength: moderate

## Phase 2: Native Or Simpler Replacements

### file-loader
- Why now: The webpack config still uses `file-loader` for images and fonts, which is a classic webpack 4-era pattern.
- Expected benefit: Move asset emission to webpack 5 asset modules and drop a legacy loader.
- Output risk: medium
- Build/deploy risk: low
- Reviewability: moderate
- Recommendation strength: strong

### html-webpack-tags-plugin
- Why now: The plugin only injects social meta tags into generated HTML, which can likely move into the HTML template or HtmlWebpackPlugin wiring.
- Expected benefit: Reduce plugin count and simplify metadata generation.
- Output risk: medium
- Build/deploy risk: low
- Reviewability: moderate
- Recommendation strength: moderate

### preload-webpack-plugin
- Why now: It is only used to preload fonts, a narrow concern that can usually be expressed with native HTML or template-level hints.
- Expected benefit: Remove a brittle legacy plugin and make preload behavior easier to reason about.
- Output risk: medium
- Build/deploy risk: low
- Reviewability: moderate
- Recommendation strength: moderate

## Phase 3: Sticky Upgrade Blockers

### react / react-dom / react-router-dom / preact
- Why now: The app is pinned to an older React 16 / Router 5 era and is resolved through `preact/compat`, so framework upgrades are coupled.
- Expected benefit: A deliberate modernization path would reduce long-term compatibility drag and make future tooling upgrades less constrained.
- Output risk: high
- Build/deploy risk: medium
- Reviewability: hard
- Recommendation strength: moderate

### workbox-webpack-plugin
- Why now: The audit shows an active high-severity transitive chain through `workbox-build` and `rollup-plugin-terser`, and the service worker affects offline/cache behavior.
- Expected benefit: Resolves a real security and maintenance concern while keeping service worker behavior under review.
- Output risk: high
- Build/deploy risk: high
- Reviewability: hard
- Recommendation strength: strong

### copy-webpack-plugin / css-minimizer-webpack-plugin
- Why now: Both packages are direct high-severity audit findings through vulnerable `serialize-javascript` paths, and both currently require semver-major upgrades for the first fix.
- Expected benefit: Reduces active security drag in the production build while making asset-copy and CSS-minification behavior explicit during review.
- Output risk: medium
- Build/deploy risk: high
- Reviewability: moderate
- Recommendation strength: strong

### typescript / @types/* / eslint / @typescript-eslint/*
- Why now: `npm run lint` is already broken under the current `typescript@3.9` floor, and the repo’s TS, ambient types, and lint parser/rules need to move in a coordinated way.
- Expected benefit: Restores a reliable local quality gate and removes a major source of future compiler and lint drift.
- Output risk: low
- Build/deploy risk: medium
- Reviewability: hard
- Recommendation strength: strong

### webpack / webpack-cli / webpack-dev-server
- Why now: These three packages anchor the current build and local dev flow, and any major change will cascade through the whole toolchain.
- Expected benefit: Upgrade coordination can clear out peer friction and modernize the build surface in one controlled pass.
- Output risk: high
- Build/deploy risk: high
- Reviewability: hard
- Recommendation strength: strong

## Phase 4: Optional Modernization

### react-fade-in
- Why now: It is a narrow UX helper rather than a structural dependency.
- Expected benefit: Replace with a local CSS or component-level animation if the UI is being refreshed anyway.
- Output risk: low
- Build/deploy risk: low
- Reviewability: easy
- Recommendation strength: weak

### web-vitals / image-size / sha1 / webp-converter
- Why now: These are small utility dependencies that could be revisited as adjacent scripts and analytics evolve.
- Expected benefit: Trim script-level utilities where native APIs or different tooling become sufficient.
- Output risk: medium
- Build/deploy risk: medium
- Reviewability: moderate
- Recommendation strength: weak

## Early Wins

- Remove `ts-loader`, because webpack already compiles `\.tsx?$` through `babel-loader`.
- Remove `@types/react-netlify-form`, because the audit found no confirmed repo import.
- Confirm whether `@types/webpack-env` is needed; if not, remove it as manifest-only type drag.
- Replace `robotstxt-webpack-plugin` with a checked-in `public/robots.txt` that preserves the current allow-all output.
