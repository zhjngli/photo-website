# Dependency Audit Design

## Goal

Create a dependency audit for this repo that helps future upgrades stay easy without casually changing generated site output. The audit should start from direct dependencies in `package.json`, explain what each one is doing in this repo, identify which ones create upgrade drag, and propose a phased roadmap for cleanup or replacement.

## Scope

Primary scope:

- Direct dependencies and dev dependencies declared in `package.json`
- Repo-level runtime/deploy configuration that materially affects upgradeability, including `.nvmrc`, `netlify.toml`, and other version pins

Secondary scope:

- Specific transitive dependencies only when they materially explain:
  - current security findings
  - peer dependency conflicts
  - legacy ecosystem drag
  - user-visible output risk

Out of scope for this phase:

- Full transitive dependency inventory
- Immediate code or config removals
- Refactors or plugin replacements

## Audit Objectives

The audit must answer these questions for each direct dependency:

1. What does this dependency do in this repo?
2. Where is it used?
3. Does it materially affect generated website output?
4. Does it materially affect build, local dev, or Netlify deployment?
5. How much future upgrade drag does it create?
6. How easy would it be to replace or remove while preserving output?
7. What should we do with it: keep, watch, replace later, remove candidate, or investigate further?

## Output Priorities

Priority order:

1. Preserve user-visible site output where possible
2. Preserve successful build/dev/deploy behavior
3. Improve future upgradeability
4. Reduce dependency surface and legacy plugin drag

If there is tension between easier upgrades and output stability, the audit should default to output stability and explicitly flag any item that may require review of output changes.

## Deliverables

The audit work should produce:

1. A dependency catalog document grouped by area
2. A phased roadmap for future cleanup or replacement
3. A small set of highlighted “early wins” that are low-risk to output
4. Explicit notes on high-risk areas that should not be touched casually

The catalog should be saved as a separate repo-local document so it can be reviewed as a long-lived reference artifact.

## Catalog Structure

The catalog should be grouped into sections, each with a compact table.

Planned sections:

- Build Core
- Build Plugins And Loaders
- Babel And TypeScript
- Styling Pipeline
- App And Runtime
- Quality And Tooling
- Deploy And Environment

Each row should represent one direct dependency or one repo-level runtime/deploy dependency point.

## Required Fields Per Entry

Each dependency entry should include:

- Name
- Type
  - dependency
  - devDependency
  - repo/runtime config
- Current version/range
- Primary role in this repo
- Evidence
  - key file references showing how it is used
- User-visible output sensitivity
  - none
  - low
  - medium
  - high
- Build/deploy sensitivity
  - none
  - low
  - medium
  - high
- Upgrade-drag severity
  - low
  - medium
  - high
- Maintenance burden
  - low
  - medium
  - high
- Transitive context
  - only if necessary
- Recommendation
  - keep
  - keep but watch
  - replace later
  - remove candidate
  - investigate

## Evaluation Criteria

### User-visible output sensitivity

This should reflect the likelihood that changing or removing the dependency alters:

- generated HTML
- CSS output
- JavaScript behavior
- copied assets
- metadata and SEO output
- service worker behavior
- offline or caching behavior

### Build/deploy sensitivity

This should reflect the likelihood that changing or removing the dependency affects:

- `npm install`
- `npm run start`
- `npm run build`
- Netlify build/deploy behavior
- Node/runtime compatibility

### Upgrade-drag severity

This should reflect how much the dependency tends to:

- pin older infra expectations
- introduce peer dependency conflicts
- depend on legacy webpack-era patterns
- hide important transitive vulnerabilities
- require extra compatibility work during major upgrades

## Use Of Transitive Context

Transitive dependencies should only be pulled into the catalog narrative when they explain why a direct dependency is risky or sticky.

Examples:

- a direct package whose real issue is a vulnerable transitive package
- a plugin whose peer dependency range blocks upgrading webpack or webpack-dev-server
- a tool whose replacement value is mostly driven by what it drags into the tree

The audit should avoid turning into a full dependency graph dump.

## Roadmap Structure

The roadmap should be phased and review-oriented.

### Phase 0: Freeze Expectations

Identify what outputs should be preserved and what should be diff-checked before future cleanup:

- key pages
- generated assets
- SEO files
- service worker behavior
- deploy/runtime expectations

### Phase 1: Low-Risk Removals

Dependencies that are easy to remove or replace while preserving output closely.

### Phase 2: Native Or Simpler Replacements

Older tooling that can likely be replaced with built-in platform or webpack 5 behavior while preserving output with reasonable review.

### Phase 3: Sticky Upgrade Blockers

Dependencies that create outsized future upgrade pain and may need deliberate work to unwind.

### Phase 4: Optional Modernization

Cleanup that is not urgent for longevity, but may simplify the stack further later.

## Required Fields Per Roadmap Item

Each roadmap item should include:

- Dependency or dependency cluster
- Why it appears in this phase
- Expected benefit
- Output risk
- Build/deploy risk
- Reviewability
  - easy
  - moderate
  - hard
- Recommendation strength
  - strong
  - moderate
  - weak

## Recommended Audit Approach

Recommended approach: direct dependency audit with targeted transitive context.

Why:

- It starts from the packages the repo explicitly owns
- It stays reviewable
- It still exposes the real reasons certain direct packages are risky
- It matches the goal of understanding upgrade longevity without drowning in tree detail

## Success Criteria

The audit is successful if it lets a future maintainer:

- explain what the major dependencies are doing
- identify which ones are low-risk to remove or replace
- identify which ones are risky because they affect output
- identify which ones create future upgrade pain
- choose a phased cleanup strategy with explicit review checkpoints

## Risks And Constraints

- Lockfile refreshes may widen more of the toolchain than expected, so the audit must distinguish direct intent from incidental drift
- Some packages that look trivial may actually affect output via generated assets or SEO/service-worker behavior
- Netlify/runtime compatibility must be treated as part of upgradeability, not as a separate concern

## Planned Next Step

After approval of this design, the next artifact should be an implementation plan for collecting the dependency catalog and roadmap from the current repo state.
