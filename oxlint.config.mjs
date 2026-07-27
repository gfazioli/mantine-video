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
    // Repo-specific (carried over from the hand-maintained config): the <video> element
    // supports captions through the compound `<Video.Captions>` / `<Video.CaptionsButton>`
    // API, not an inline <track>, so the raw-element caption rule is a false positive here.
    'jsx-a11y/media-has-caption': 'off',
  },
  // Upstream ignores 'docs/out' and 'package/dist' but not 'docs/.next', which our docs sites have.
  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}', 'docs/.next', 'docs/out', 'package/dist'],
});
