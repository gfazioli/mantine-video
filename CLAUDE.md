# CLAUDE.md

## Project

`@gfazioli/mantine-video` — A customizable video player component for React built with Mantine. Compound API in Mantine ecosystem style (`<Video.Controls>`, `<Video.PlayButton>`, `<Video.Timeline>`), headless `useVideo` hook, theme-aware styling, accessibility, and full Styles API support.

Bootstrapped from `mantine-base-component` (the GitHub template for the Mantine Extensions ecosystem).

## Commands

| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint + Stylelint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API (props, types, exports), always run `yarn clean && yarn build` before `yarn test`, because `yarn docgen` needs the fresh build output.

## Architecture

### Workspace Layout

Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)

- `Video.tsx` — Main component using `polymorphicFactory()` with Mantine's Styles API. Wraps a native `<video>` element with React-friendly props (controlled `playing`/`currentTime`/`volume`), variants (`overlay`/`minimal`/`floating`/`bordered`), and sizes.
- `Video.module.css` — CSS module with custom properties and data-attribute selectors
- `Video.test.tsx` — Jest tests using `@mantine-tests/core` render helper
- `Video.story.tsx` — Storybook stories
- `use-video.ts` — Headless `useVideo` hook returning state + actions, allowing consumers to build fully custom UI
- `Video.context.ts` — Internal context shared with compound sub-components
- `components/` — Compound sub-components (`Video.Controls`, `Video.PlayButton`, `Video.Timeline`, `Video.VolumeControl`, etc.) composed from Mantine `ActionIcon`, `Slider`, `Menu`, `Popover`
- `index.ts` — Public exports (root component + sub-components + hook + types)

### Build Pipeline

Rollup bundles to dual ESM (`dist/esm/`) and CJS (`dist/cjs/`) with `'use client'` banner. CSS modules are hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS is split into `styles.css` and `styles.layer.css` (layered version).

### Docs (`docs/`)

- `docs/data.ts` — Package metadata
- `docs/docs.mdx` — Main documentation content
- `docs/demos/` — Interactive demos using `@mantinex/demo`
- `docs/pages/index.tsx` — Assembles Shell, PageHeader, DocsTabs, and the MDX content
- `docs/styles-api/` — Styles API data for the documentation table
- `docs/docgen.json` — Auto-generated from TypeScript types (don't edit manually)

The `next.config.mjs` dynamically sets `basePath` from the repository field in `package/package.json`.

## Component Details

### Compound API

```tsx
<Video src="..." poster="...">
  <Video.Poster />
  <Video.BigPlayButton />
  <Video.Loading />
  <Video.Error />
  <Video.Controls>
    <Video.PlayButton />
    <Video.SkipButton seconds={-10} />
    <Video.SkipButton seconds={10} />
    <Video.Timeline />
    <Video.TimeDisplay />
    <Video.VolumeControl />
    <Video.CaptionsButton />
    <Video.SettingsMenu />
    <Video.PiPButton />
    <Video.FullscreenButton />
  </Video.Controls>
  <Video.Captions />
</Video>
```

### Compound Registration Checklist

Follow [[compound-component-pattern]] from the workspace memory:

1. Declare `staticComponents` in the parent's `Factory<{...}>` type
2. Attach sub-components: `Video.PlayButton = VideoPlayButton`
3. Set `displayName` on parent and every sub-component
4. Export sub-component types from `index.ts`
5. Register in docs: `scripts/docgen.ts`, `docs/pages/index.tsx` (`DocsTabs` with `componentPrefix`), `docs/styles-api/`

### Theming

CSS variables: `--video-color`, `--video-radius`, `--video-bg`, `--video-controls-bg`, `--video-controls-height`, `--video-timeline-color`, `--video-timeline-thumb-color`. All resolved via `createVarsResolver<VideoFactory>()`.

### Headless usage

```tsx
const { playing, currentTime, duration, play, pause, toggle, seek, videoRef } = useVideo({
  src: 'https://example.com/video.mp4',
});

return <video ref={videoRef} />;
```

## Testing

Jest with `jsdom` environment, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Component tests use `@mantine-tests/core` render helper.

Standard test coverage: renders without crashing, forwards ref, data attributes for variants/states, keyboard shortcuts, controlled vs uncontrolled state.

## Ecosystem

See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code → test → build → docs → release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
