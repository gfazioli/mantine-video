import { defineConfig } from 'oxlint';
import { oxlint } from 'oxc-config-mantine';

export default defineConfig({
  ...oxlint,
  rules: {
    ...oxlint.rules,
    // Upstream ships `curly: 'error'` (defaults to "all" → braces always required), which
    // conflicts with oxfmt: the formatter collapses single-statement bodies onto the condition
    // line (`if (x) return;`), so a freshly-formatted file fails its own lint step.
    // "multi-line" allows exactly what oxfmt emits while still requiring braces for multi-line
    // bodies. Do not drop this override when bumping oxc-config-mantine.
    curly: ['error', 'multi-line'],
    // Repo-specific. Captions ARE supported: the `tracks` prop renders one <track> per entry
    // inside the <video> element (see Video.tsx and its "Text tracks" tests), which is what makes
    // <Video.CaptionsButton /> appear. The rule still fires because it only inspects JSX
    // statically and cannot see through the `tracks.map(...)` that produces those children.
    //
    // Verified 2026-07-28 by removing this override: the rule reports Video.tsx even with tracks
    // rendered. It also reports Video.demo.headless.tsx, where a bare <video> is intentional —
    // that demo exists to show driving a plain element with the useVideo hook.
    //
    // NOTE: the previous comment here claimed captions came from a compound
    // `<Video.Captions>` / `<Video.CaptionsButton>` API. That was wrong — `Video.Captions` has
    // never existed, and before the `tracks` prop there was no way to attach a track at all.
    'jsx-a11y/media-has-caption': 'off',
  },
  // Upstream ignores 'docs/out' and 'package/dist' but not 'docs/.next', which our docs sites have.
  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}', 'docs/.next', 'docs/out', 'package/dist'],
});
