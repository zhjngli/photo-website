# Service Worker Design

This document describes the proposed current-generation service-worker approach for `photo-website`.

## Goal

Restore offline support and repeat-visit caching for the portfolio site without reintroducing the previous Workbox dependency chain.

## Constraints

- Keep the implementation small and understandable
- Avoid reintroducing `workbox-webpack-plugin`
- Preserve the current visible site output
- Favor deterministic offline behavior over complex automation
- Prefer aggressive updates because deploys are infrequent and the site is simple

## Current State

- [`src/serviceWorkerRegistration.ts`](../src/serviceWorkerRegistration.ts) still exists
- [`src/index.tsx`](../src/index.tsx) does not currently register a service worker
- [`webpack.config.js`](../webpack.config.js) no longer generates `service-worker.js`
- The site still ships installability-related metadata in [`public/index.html`](../public/index.html), but there is no active offline cache layer today

## Recommended Approach

Use a custom hand-written service worker instead of Workbox.

Planned characteristics:

- hand-written service worker file committed to the repo
- registration restored from [`src/index.tsx`](../src/index.tsx)
- build-time or deploy-time deterministic cache versioning
- full-site precache for same-origin app shell and gallery assets
- no third-party precaching

## Why Not Reintroduce Workbox

The old Workbox setup was convenient, but it kept the remaining security/audit drag alive through the Workbox build chain. The new design aims to preserve offline behavior without bringing that dependency surface back.

## Offline Strategy

The site is small enough that full-site same-origin precaching is acceptable.

The intended service-worker behavior is:

- precache:
  - `/`
  - `/index.html`
  - built JS and CSS bundles
  - manifest, robots, favicon, touch icons
  - gallery image assets
  - self-hosted images and resume assets
- do not precache:
  - Google Analytics
  - Instagram, shop, or other external links
  - any third-party origin resource

## Fetch Strategy

### Navigation requests

Use network-first with app-shell fallback.

Why:

- when online, users get fresh HTML quickly after deploys
- when offline, the site can still load from cached shell content

### Same-origin static assets and images

Use cache-first.

Why:

- this is what makes the portfolio meaningfully useful offline
- image-heavy repeat visits benefit most from local cached assets

### Third-party requests

Do not cache them in the service worker.

## Update Behavior

Use aggressive activation semantics.

Intended behavior:

- new service worker activates quickly on deploy
- old named caches are cleared during activation
- the page should reload cleanly after activation so the user lands on one consistent version

Rationale:

- the site is simple
- deploys are infrequent
- stale content is more annoying than rare mid-session refresh behavior

## Implementation Shape

Expected implementation pieces:

1. A committed service-worker file, likely under `public/`
2. A way to provide the service worker with the list of same-origin assets to precache
3. Registration restored in [`src/index.tsx`](../src/index.tsx)
4. A cache version strategy tied to the current build/deploy

## Open Implementation Choice

There are two plausible ways to feed the precache list:

1. Build-generated asset manifest
- more deterministic
- better for full-site offline guarantees
- slightly more build integration work

2. Simpler static list plus runtime cache-fill
- less build integration work
- weaker guarantee that every built asset is available on first offline use

Recommended choice: build-generated asset manifest.

## Success Criteria

The service-worker implementation should be considered successful if:

- the site still builds and deploys normally
- previously deployed gallery images and routes are available offline
- same-origin app assets remain fast on repeat visits
- external resources are not incorrectly cached
- the implementation does not reintroduce the Workbox dependency path

## Non-Goals

- no attempt to restore the old Workbox implementation exactly
- no advanced background sync or push behavior
- no caching of third-party resources
- no broad frontend refactor
