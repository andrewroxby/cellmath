# cellmath for Claude Code

Renders the LaTeX in Claude's replies as Unicode math in the terminal.

A reply that would show the source

```
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

shows this instead:

```
           ▁▁▁▁▁▁▁▁▁
    -b ± ╲╱ b² - 4ac
x = ────────────────
           2a
```

Inline math becomes text in the sentence: `$\Delta = b^2 - 4ac$` reads as
`Δ = b² - 4ac`. Display math (`$$…$$`, `\[…\]`, or a top-level environment)
becomes stacked Unicode in a code block, so its columns stay aligned. Math
renders as the reply streams in, and a display block appears once its closer
lands. Code, prices such as `$5 and $10`, and anything the converter can't
parse stay as written.

What the converter draws is described in the [repository README](../README.md).

## Install

```bash
claude plugin marketplace add andrewroxby/cellmath
claude plugin install cellmath@cellmath
```

Start a new session, or run `/reload-plugins` in a running one.

Claude writes LaTeX only when it has a reason to. A line like this in your
`CLAUDE.md` makes it a habit:

```
Write math in LaTeX: $...$ inline and $$...$$ for display.
```

## Requirements and limits

- Claude Code in a terminal. The VS Code chat panel and `claude -p` show the
  LaTeX source.
- The plugin uses Claude Code's mod API, which can change between releases.
- Inline math has one row, so a fraction in a sentence flattens to `a/b`.

## How it works

Two hooks share the converter. A `MessageDisplay` hook redraws each batch of
lines while a reply streams, holding back an unclosed display block until it
closes. An `AssistantMessage` render hook covers finished replies and replies
drawn from history. Converting converted text changes nothing, so a reply can
pass through both.

`hooks/cellmath.js` is the core, bundled by `npm run build` at the repository
root. Edit the core, not the bundle.
