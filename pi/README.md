# cellmath for Pi

Draws the LaTeX in Pi's Markdown with cellmath's converter, in place of Pi's
built-in one. Pi still finds the math, inline `$…$` and `\(…\)` and display
`$$…$$` and `\[…\]`, and keeps the source in the transcript; only the drawing
changes. Radical bars are overlines, since Pi's output carries styling.

## Install

Add this directory to the `packages` list in `~/.pi/agent/settings.json`, as a
path relative to that file:

```json
"packages": ["../../path/to/cellmath/pi"]
```

Then start a new session, or run `/reload` in a running one.

## How it works

Pi has no seam for swapping its LaTeX renderer, so `patch.ts` wraps the two
`Markdown` methods that draw LaTeX tokens, `renderToken` for display blocks
and `renderInlineTokens` for inline math. cellmath converts each finished
token; anything it cannot convert, and every other token, goes to Pi as
before. At load the patch checks that Pi's methods still exist, and if they
don't, it warns and leaves Pi's own renderer in place.

`npm test` at the repository root runs the patch against the installed Pi's
`pi-tui`, so it catches a Pi upgrade that changes those methods.
