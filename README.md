# cellmath

LaTeX set into terminal cells, for coding agents and editors that draw
Markdown in a terminal.

The core converts LaTeX to Unicode laid out on the terminal grid. Thin adapters
put it in front of each harness, and a CLI serves everything else.

```
           ▁▁▁▁▁▁▁▁▁
    -b ± ╲╱ b² - 4ac
x = ────────────────
           2a
```

## What it draws

Fractions stack, radicals get a bar, and integrals and `\left…\right`
delimiters grow to fit:

```
dΨᴀ                                   1
─── = γᴀ Ψᴜ - αᴀ Ψᴀ + ρᴀ Ψᴀ Ψᴜ        ╭
dt                                    │ f(x) dx
                                      ╯
                                      0
```

`aligned`, `align`, and `split` line up on their `&` columns, braces carry
their labels, and matrices get their brackets:

```
(a+b)² = a² + 2ab + b²       1.2¹ ×   15 px   = 18 px       A = ╭ 1   2 ╮
(x+1)² = x² + 2x + 1         ╰┬─╯     ╰─┬─╯                     ╰ 3   4 ╯
                             zoom   font size
```

Everything that spans several cells (brackets, braces, integrals, radicals,
fraction bars) is built from box-drawing and block characters. Terminals draw
those themselves to fill the cell, so they join at any font and line height,
where font-drawn pieces such as `⎛⎜⎝` break apart once lines are spaced out.

A radical's bar is a row of `▁` in plain output. Where output can carry
styling, it is an overline on the radicand instead: thinner, and flush with
the top of the `╱`. Ghostty places overlines slightly below the top of the
cell; `adjust-overline-position` (a few pixels up) closes the gap, and tmux
needs `terminal-features` to include `overline` to pass it through.

Sub- and superscripts use the glyphs Unicode has. Subscript letters Unicode
cannot lower, capitals among them, use small capitals (`Ψᴀ`, `xʙ`), so every
Latin script stays on one row. Math alphabets map too: `\mathcal{L}` is `ℒ`
and `\mathbb{R}` is `ℝ`. Greek scripts outside Unicode's small set (`L_θ`,
`e^(λt)`) still fall back to `_` and `^`.

## Layout

| Directory | What it is |
|---|---|
| `core/` | Converter (`convert.ts`), Markdown scanner (`markdown.ts`), and CLI (`cli.ts`) |
| `claude/` | Claude Code plugin; see [its README](claude/README.md) |

The Markdown scanner finds math in replies while they stream: inline `$…$`
and `\(…\)`, display `$$…$$` and `\[…\]`, and top-level environments. It
leaves code, HTML code, `\verb`, and prices such as `$5 and $10` alone.

## CLI

```bash
cellmath '\frac{1}{2}'                 # display layout
cellmath --inline 'x_b + \alpha^2'     # one row
cellmath --markdown notes.md           # convert the math in a file (or stdin)
```

Styling is on when writing to a terminal and `NO_COLOR` is unset; `--ansi`
and `--plain` override that.

Install it with `npm link` in this checkout.

## Future plans

A small font of lowered and raised glyphs for the sub- and superscripts
Unicode lacks, so Greek scripts such as `L_θ` and `e^(λt)` render on one
row like the rest.

## Development

```bash
npm install
npm test          # type-check, core tests, plugin bundle, plugin test
```

`npm run build` rebundles the core into `claude/hooks/cellmath.js`.

## License

MIT. The converter began as a fork of `renderLatex()` from
[pi-tui](https://github.com/earendil-works/pi/tree/main/packages/tui); its
notice is in `core/vendor/NOTICE`.
