# Dependabot Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clear the repo's current open npm Dependabot alerts with the smallest safe set of dependency and lockfile changes.

**Architecture:** Keep this as a minimal dependency remediation, not a full toolchain modernization. Update the direct packages that own the vulnerable transitive graph (`webpack-dev-server`, `copy-webpack-plugin`, `terser-webpack-plugin`), regenerate `package-lock.json`, and only touch webpack config if the upgraded dev server rejects the current config. `npm audit` currently reports a wider backlog, but that is out of scope for this plan unless the user explicitly expands the work.

**Tech Stack:** Node.js, npm, webpack 5, webpack-dev-server, React/Preact, TypeScript, Netlify

---

## Current Inventory

GitHub Dependabot currently reports 10 open npm alerts across 7 packages:

- `webpack-dev-server` (`package.json`, `package-lock.json`): alerts `105`, `106`, `107`, `108`
- `serialize-javascript` (`package-lock.json`): alert `96`
- `@babel/helpers` (`package-lock.json`): alert `97`
- `@babel/runtime` (`package-lock.json`): alert `98`
- `http-proxy-middleware` (`package-lock.json`): alerts `103`, `104`
- `brace-expansion` (`package-lock.json`): alert `110`
- `on-headers` (`package-lock.json`): alert `111`

Direct package ownership in this repo:

- `webpack-dev-server` is declared in [package.json](/Users/zli/workspace/photo-website/package.json:80) and configured in [webpack.config.js](/Users/zli/workspace/photo-website/webpack.config.js:270)
- `copy-webpack-plugin` is declared in [package.json](/Users/zli/workspace/photo-website/package.json:46) and instantiated in [webpack.config.js](/Users/zli/workspace/photo-website/webpack.config.js:25)
- `terser-webpack-plugin` is declared in [package.json](/Users/zli/workspace/photo-website/package.json:72) and instantiated in [webpack.config.js](/Users/zli/workspace/photo-website/webpack.config.js:252)

### Task 1: Reproduce And Freeze The Baseline

**Files:**
- Modify: none
- Reference: `package.json`
- Reference: `webpack.config.js`

- [ ] **Step 1: Confirm the current GitHub alert inventory**

Run:

```bash
gh api -H 'Accept: application/vnd.github+json' '/repos/zhjngli/photo-website/dependabot/alerts?state=open&per_page=100' --jq 'group_by(.dependency.package.name) | map({package: .[0].dependency.package.name, alerts: length, alert_numbers: map(.number), manifests: (map(.dependency.manifest_path) | unique), patched_versions: (map(.security_vulnerability.first_patched_version.identifier) | unique)})'
```

Expected: 7 grouped packages and 10 total alerts, matching the inventory above.

- [ ] **Step 2: Confirm local install state before changing anything**

Run:

```bash
npm ls webpack-dev-server http-proxy-middleware serialize-javascript @babel/runtime @babel/helpers brace-expansion on-headers --all
```

Expected: current tree shows `webpack-dev-server@4.15.2`, top-level `serialize-javascript@5.0.1`, and vulnerable `on-headers@1.0.2` under `compression`.

- [ ] **Step 3: Record the current runtime floor**

Run:

```bash
node -v
npm -v
```

Expected: local machine is already on Node 18+, but the repo itself does not declare that floor anywhere authoritative.

### Task 2: Declare The Runtime Requirement Needed By The Fix

**Files:**
- Modify: [package.json](/Users/zli/workspace/photo-website/package.json:1)

- [ ] **Step 1: Add an `engines.node` floor that matches the patched dev server**

Update the package manifest so the runtime contract is explicit:

```json
{
  "engines": {
    "node": ">=18.12.0"
  }
}
```

Place the `engines` block near the top-level package metadata, not inside `dependencies`.

- [ ] **Step 2: Leave the existing `"node": "^15.7.0"` package dependency untouched for this pass unless install behavior proves it is harmful**

No code change in this step. The remediation goal is to clear security alerts, not to broaden scope into runtime packaging cleanup.

- [ ] **Step 3: Validate the manifest still parses**

Run:

```bash
npm pkg get engines
```

Expected: npm prints the new `{"node":">=18.12.0"}` value without rewriting unrelated manifest fields.

### Task 3: Upgrade The Direct Packages That Own The Vulnerable Graph

**Files:**
- Modify: [package.json](/Users/zli/workspace/photo-website/package.json:46)
- Modify: [package-lock.json](/Users/zli/workspace/photo-website/package-lock.json:1)

- [ ] **Step 1: Update the direct dependency versions in `package.json`**

Change only the packages required to clear the current Dependabot graph:

```json
{
  "dependencies": {
    "copy-webpack-plugin": "^9.0.1",
    "terser-webpack-plugin": "^5.3.11",
    "webpack-dev-server": "^5.2.3"
  }
}
```

Why these targets:

- `webpack-dev-server@5.2.3` is the first safe line confirmed by `npm audit fixAvailable` and clears the four direct GitHub alerts
- `copy-webpack-plugin@9.0.1` is the lowest version line verified to pull `serialize-javascript@^6.0.0`
- `terser-webpack-plugin@5.3.11` is the first line verified to pull `serialize-javascript@^6.0.2`

- [ ] **Step 2: Regenerate the lockfile from the updated manifest**

Run:

```bash
npm run reinstall
```

Expected: a fresh `package-lock.json` with the upgraded direct dependencies and no top-level `serialize-javascript@5.0.1`.

- [ ] **Step 3: Confirm the vulnerable transitive nodes moved**

Run:

```bash
npm ls webpack-dev-server http-proxy-middleware serialize-javascript @babel/runtime @babel/helpers brace-expansion on-headers --all
```

Expected:

- `webpack-dev-server` is on `5.2.x`
- `http-proxy-middleware` and `on-headers` are no longer on the vulnerable versions reported by GitHub
- the top-level `serialize-javascript@5.0.1` tree is gone
- `@babel/helpers`, `@babel/runtime`, and `brace-expansion` are at or above their patched versions after the lockfile rewrite

### Task 4: Verify The Webpack Config Still Works With The New Dev Server

**Files:**
- Modify if needed: [webpack.config.js](/Users/zli/workspace/photo-website/webpack.config.js:270)

- [ ] **Step 1: Start the dev server without changing config**

Run:

```bash
npm run start
```

Expected: webpack starts successfully on `https://localhost:3000` using the existing `devServer` block:

```js
devServer: {
  compress: true,
  port: 3000,
  server: 'https',
  open: true,
  historyApiFallback: true
}
```

- [ ] **Step 2: Only edit `webpack.config.js` if the dev server reports schema or option errors**

Keep the change tightly scoped to [webpack.config.js](/Users/zli/workspace/photo-website/webpack.config.js:270). Do not refactor unrelated webpack config while remediating alerts.

- [ ] **Step 3: Verify the production build still succeeds**

Run:

```bash
npm run build
```

Expected: a clean production webpack build with no dependency resolution or plugin compatibility errors.

### Task 5: Confirm The Dependabot Alerts Are Actually Cleared

**Files:**
- Modify: none

- [ ] **Step 1: Re-run local security checks after the dependency update**

Run:

```bash
npm audit --omit=dev
```

Expected: the specific GitHub-reported packages from this plan no longer appear as unresolved production vulnerabilities. A wider audit backlog may remain; do not expand scope here unless requested.

- [ ] **Step 2: Commit the remediation branch**

Run:

```bash
git add package.json package-lock.json webpack.config.js
git commit -m "build: remediate npm dependabot alerts"
```

Expected: a single focused commit containing only dependency remediation and any required config compatibility fix.

- [ ] **Step 3: After merge to `main`, verify GitHub re-analyses the default branch**

Run:

```bash
gh api -H 'Accept: application/vnd.github+json' '/repos/zhjngli/photo-website/dependabot/alerts?state=open&per_page=100'
```

Expected: alert count drops from 10, ideally to 0 for the packages listed in this plan.
