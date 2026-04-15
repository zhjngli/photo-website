# Security-First Hardening Design

## Goal

Reduce current GitHub Dependabot alerts and high-severity `npm audit --omit=dev` findings while preserving the visible website and current deploy behavior by default.

This design treats modernization as a means to reduce security risk and upgrade drag, not as a standalone goal.

## Baseline

This design assumes the current branch state after the earlier dependency remediation work and uses [docs/dependency-audit.md](../../dependency-audit.md) as the baseline evidence source.

The audit already identifies:

- dead or manifest-only dependencies
- low-risk legacy build helpers that may be replaceable
- direct packages tied to current high-severity audit paths
- coupled framework/runtime areas that should not be touched casually

## Primary Outcomes

The first hardening pass should target all of the following:

1. Clear current GitHub Dependabot alerts
2. Clear current high-severity `npm audit --omit=dev` findings
3. Preserve visible site output and deploy behavior by default
4. Reduce direct dependency surface where there is clear evidence a dependency is unused, redundant, or replaceable with a simpler static or native approach

## Constraints

- No framework migration in this pass
- No visual redesign in this pass
- No broad refactors that are not tied to security reduction or upgradeability
- No intentional changes to core output dependencies such as `react-photo-gallery` unless they are required to clear security findings
- Temporary runtime pins are acceptable during remediation, but pin removal or loosening should remain an explicit later goal

## Recommended Approach

Recommended approach: security-first hardening on the current stack.

Why:

- It aligns directly with the user goal of reducing vulnerabilities first
- It keeps the current website as the baseline for review
- It avoids mixing security work with a framework rewrite
- It favors removing unnecessary dependencies before spending effort upgrading them

Rejected alternatives:

### Minimal hardening only

Only remove obviously dead packages and upgrade the direct alert carriers.

Trade-off:

- Lowest short-term risk
- Leaves more legacy drag behind
- Higher chance of returning to the same maintenance problem quickly

### Aggressive simplification first

Use the security work as a reason to remove optional infrastructure such as service-worker support, `preact/compat`, and more of the legacy webpack stack immediately.

Trade-off:

- Could leave the cleanest long-term surface
- Mixes security remediation with broader behavior review
- Higher risk of churn and slower progress

## Decision Rules

Every dependency or runtime-config change in the first pass should be classified into one of four buckets before implementation:

### Remove

Use when a package has no confirmed usage, or can be replaced by a static file or config with equivalent output.

### Replace

Use when a package is still doing work, but webpack-native, platform-native, or static behavior can preserve the same output with less dependency drag.

### Upgrade

Use when a package is still needed and is directly tied to a current alert or high-severity audit path.

### Defer

Use when a package is coupled to framework or runtime behavior and should only move if it is required to clear security findings.

Implementation bias:

- Prefer `Remove` over `Upgrade`
- Prefer `Upgrade` over broader refactor
- Do not change a package in this pass just because “modernization would be nice”

## Workstream Order

The hardening pass should be executed in this order.

### 1. Removal Workstream

Target manifest-only or dead dependencies first.

Current candidates from the audit:

- `ts-loader`
- `@types/react-netlify-form`
- likely `@types/webpack-env`
- `robotstxt-webpack-plugin` if a static `public/robots.txt` preserves output

Reasoning:

- Smallest review surface
- Lowest output risk
- Immediate direct dependency reduction

### 2. Low-Risk Replacement Workstream

Replace legacy helpers only where output can be matched closely.

Current candidates from the audit:

- `file-loader` -> webpack 5 asset modules
- `html-webpack-tags-plugin` -> static/template/meta wiring
- `preload-webpack-plugin` -> native preload tags or template-level hints

Reasoning:

- Simplifies the build surface without changing the framework
- Can reduce future upgrade drag before touching more security-sensitive paths

### 3. Security-Upgrade Workstream

After the dependency surface is smaller, target packages directly tied to active alerts or high-severity audit findings.

Current candidates from the audit:

- `copy-webpack-plugin`
- `css-minimizer-webpack-plugin`
- `workbox-webpack-plugin`
- any remaining direct packages still tied to Dependabot or high-severity audit output

Reasoning:

- Reduces risk after the low-value baggage is removed
- Keeps the security work focused on packages that are clearly still needed

### 4. Deferred Review Workstream

Document but do not automatically execute in the first pass:

- `preact` / `react` / `react-dom`
- `react-router-dom`
- service worker retention versus removal
- broader TypeScript and lint modernization beyond what is needed to restore a sane security baseline

Reasoning:

- These are coupled systems with higher output and integration risk
- They should move only if required for security or if a later simplification pass is approved

## Acceptance Criteria

Each change in the hardening pass should meet all applicable criteria:

- output remains equivalent unless explicitly reviewed otherwise
- `npm install` passes
- `npm run build` passes
- Netlify deploy assumptions remain valid
- the change measurably reduces direct dependency surface, active alerts, or high-severity audit findings

## Verification Strategy

Verification should happen after each workstream, not only at the end.

Core checks:

- `npm install`
- `npm run build`
- `npm audit --omit=dev`

Targeted output review:

- review generated `dist/` output when build helpers or emitted assets change
- spot-check `robots.txt`, `index.html` meta tags, copied assets, fonts, and service-worker artifacts when relevant
- confirm local and Netlify runtime assumptions when runtime-config files change

External security tracking:

- re-check GitHub Dependabot alert count after security-related changes are pushed

## Definition Of Success

The first hardening pass is successful if:

- current GitHub Dependabot alerts are cleared or materially reduced with a defensible reason for any remainder
- current high-severity `npm audit --omit=dev` findings are cleared or materially reduced with a defensible reason for any remainder
- the visible website and deploy behavior are preserved by default
- the repo ends the pass with a smaller and easier-to-maintain direct dependency surface

## Explicit Non-Goals

The first hardening pass does not attempt to:

- migrate to another framework such as Next.js
- redesign the website
- replace `react-photo-gallery` or other core output dependencies without a security-driven reason
- remove temporary runtime pins immediately if they are still required for the hardening path

## Follow-Up Direction

If the security-first hardening pass succeeds, a later simplification pass can evaluate:

- loosening or removing runtime pins
- deeper service-worker simplification or removal
- `preact/compat` versus plain React trade-offs
- framework migration only if the remaining stack still appears too costly to maintain
