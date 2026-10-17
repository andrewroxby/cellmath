// LaTeX in Markdown, found and replaced.
//
// expandMath walks Markdown once, skips everything that is code or verbatim,
// and hands each math span to a renderer. It knows nothing about how a span
// is drawn, so any harness can supply its own presentation.
//
// convertMarkdown is the Unicode presentation: display math becomes an
// unlabeled code block so stacked layouts keep their alignment, and inline
// math becomes escaped text. Spans the converter rejects, and spans still
// streaming in, stay as written. Converting converted text changes nothing,
// so a reply converted live can be drawn through the converter again.

import { renderLatex } from './convert.ts'

/** One piece of math found in Markdown. `start` and `end` index the source, delimiters included. */
export type MathSpan = {
  /** The math without its delimiters (`\begin{…}` environments keep theirs), trimmed. */
  latex: string
  display: boolean
  start: number
  end: number
  /** Nothing but whitespace shares the span's lines. */
  standalone: boolean
}

/**
 * What a renderer returns for a span: Markdown to put in its place,
 * or undefined to leave the source as written. Display spans, replacements
 * with newlines, and `block: true` replacements take their own lines.
 */
export type MathReplacement = string | { text: string; block?: boolean } | undefined

export type ExpandOptions = { fence?: string; hold?: boolean }

export type Expanded = { text: string; fence: string | undefined; held: string }

const QUOTE_PREFIX = /^(?: {0,3}>[ \t]?)+/
// What may precede a block that opens its own line: quotes, indent, a list marker.
const LEAD = /^(?:[ \t]*>)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)?/
const LIST_MARKER = /^([ \t]*)([-*+]|\d{1,9}[.)])([ \t]+|$)/
const FENCE_OPEN = /^[ \t]*(`{3,}|~{3,})(.*)$/
const FENCE_CLOSE = /^[ \t]*(`+|~+)[ \t]*$/
const BLANK_LINE = /\n[ \t]*\r?\n/g
const BLOCK_ENV =
  /\\begin\{(equation\*?|displaymath|math|align\*?|alignat\*?|flalign\*?|gather\*?|multline\*?|split|aligned|alignedat|gathered|array|matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|cases)\}/y
const ENV_TOKEN = /\\(begin|end)\{([^{}]+)\}/y
const HTML_CODE = /<(code|pre)[\s>]/iy

// `$` is escaped so a second pass finds no math; `[` is not, since `\[` at the
// start of a line would read as a display opener. An escaped `]` still keeps
// brackets from forming a link.
function escapeMarkdown(text: string): string {
  return text.replace(/[\\`*_\]<>|~#$]/g, (c) => '\\' + c)
}

function longestBacktickRun(text: string): number {
  let longest = 0
  for (const run of text.matchAll(/`+/g)) longest = Math.max(longest, run[0].length)
  return longest
}

function codeBlock(art: string): string {
  const fence = '`'.repeat(Math.max(3, longestBacktickRun(art) + 1))
  return fence + '\n' + art + '\n' + fence
}

/** The Unicode presentation of both harnesses' text mode. */
export function convertMarkdown(markdown: string, options: ExpandOptions = {}): Expanded {
  return expandMath(
    markdown,
    (span) => {
      if (span.display) {
        const art = renderLatex(span.latex, { display: true })
        return art === undefined ? undefined : codeBlock(art)
      }
      const text = renderLatex(span.latex)
      return text === undefined || text.includes('\n') ? undefined : escapeMarkdown(text)
    },
    options,
  )
}

export function convertMarkdownMath(markdown: string): string {
  return convertMarkdown(markdown).text
}

/**
 * Replace each math span in streamed or whole Markdown. `fence` is a code
 * fence an earlier flush left open; with `hold`, an unclosed display block
 * comes back unconverted as `held`, to be retried once more text arrives.
 */
export function expandMath(markdown: string, render: (span: MathSpan) => MathReplacement, options: ExpandOptions = {}): Expanded {
  let fence = options.fence
  if (!fence && !/[$\\]|```|~~~/.test(markdown)) return { text: markdown, fence, held: '' }

  const parts: string[] = []
  const layout: Layout = { listOffset: 0, afterBlank: true }
  let copied = 0
  let index = 0

  if (fence) {
    const end = fenceEnd(markdown, 0, fence)
    if (end === undefined) return { text: markdown, fence, held: '' }
    fence = undefined
    index = end
  }

  // Swap markdown[start, end) for the rendered span, then move past it.
  const apply = (start: number, end: number, latex: string, display: boolean) => {
    index = end
    const replacement = expansion(markdown, { latex: latex.trim(), display, start, end, standalone: isStandalone(markdown, start, end) }, render)
    if (replacement === undefined) return
    parts.push(markdown.slice(copied, start), replacement)
    copied = end
  }

  // Stop at an unclosed display block. The held text starts at its line when
  // the opener leads the line, so held lines keep their indentation.
  const hold = (opener: number): Expanded => {
    const held = opensLine(markdown, opener) ? lineStart(markdown, opener) : opener
    parts.push(markdown.slice(copied, held))
    return { text: parts.join(''), fence: undefined, held: markdown.slice(held) }
  }

  while (index < markdown.length) {
    if (index === 0 || markdown[index - 1] === '\n') {
      const code = enterLine(markdown, index, layout)
      if (code) {
        index = code.end
        fence = code.open
        continue
      }
    }

    const c = markdown[index]!

    if (c === '`') {
      index = isEscaped(markdown, index) ? index + 1 : skipInlineCode(markdown, index)
      continue
    }

    if (c === '<') {
      index = skipHtmlCode(markdown, index) ?? index + 1
      continue
    }

    if (c === '$' && !isEscaped(markdown, index)) {
      if (markdown[index + 1] === '$') {
        const close = findClose(markdown, '$$', index + 2, markdown.length)
        if (close >= 0) {
          apply(index, close + 2, markdown.slice(index + 2, close), true)
        } else if (options.hold) {
          return hold(index)
        } else {
          index += 2
        }
        continue
      }
      const close = opensInlineDollar(markdown, index) ? findInlineDollarClose(markdown, index + 1) : -1
      const latex = markdown.slice(index + 1, close)
      // An unescaped `$` inside means this opener is currency or plain text
      // that ran into a later formula, and a backtick means shell code.
      if (close >= 0 && !latex.includes('`') && !hasUnescapedDollar(latex)) {
        apply(index, close + 1, latex, false)
      } else {
        index++
      }
      continue
    }

    if (c === '\\' && !isEscaped(markdown, index)) {
      const verbEnd = skipVerb(markdown, index)
      if (verbEnd !== undefined) {
        index = verbEnd
        continue
      }

      const next = markdown[index + 1]
      if (next === '(') {
        // Inline math does not cross a paragraph.
        const close = findClose(markdown, '\\)', index + 2, paragraphEnd(markdown, index))
        const latex = markdown.slice(index + 2, close)
        if (close >= 0 && !latex.includes('`')) {
          apply(index, close + 2, latex, false)
          continue
        }
      } else if (next === '[' && opensLine(markdown, index)) {
        // Mid-line, `\[` reads as an escaped bracket, as in "see \[1\]".
        const close = findClose(markdown, '\\]', index + 2, markdown.length)
        if (close >= 0) {
          apply(index, close + 2, markdown.slice(index + 2, close), true)
          continue
        }
        if (options.hold) return hold(index)
      } else {
        BLOCK_ENV.lastIndex = index
        const env = BLOCK_ENV.exec(markdown)
        if (env) {
          const end = environmentEnd(markdown, index + env[0].length, env[1]!)
          if (end >= 0) {
            apply(index, end, markdown.slice(index, end), env[1] !== 'math')
            continue
          }
          if (options.hold) return hold(index)
        }
      }
    }

    index++
  }

  if (copied === 0) return { text: markdown, fence, held: '' }
  parts.push(markdown.slice(copied))
  return { text: parts.join(''), fence, held: '' }
}

// ---------------------------------------------------------------------------
// Rendering a span

/** The Markdown that replaces a span, or undefined to leave it. */
function expansion(markdown: string, span: MathSpan, render: (span: MathSpan) => MathReplacement): string | undefined {
  if (span.latex === '') return undefined

  // A renderer that throws leaves its span as written instead of losing the reply.
  let result: MathReplacement
  try {
    result = render(span)
  } catch {
    return undefined
  }
  if (result === undefined) return undefined

  const { text, block } = typeof result === 'string' ? { text: result, block: false } : result
  const body = text.replace(/\r\n?/g, '\n').replace(/^\n+|\n+$/g, '')
  if (body.trim() === '') return undefined
  if (!span.display && !block && !body.includes('\n')) return body
  return onOwnLines(markdown, span, body)
}

/**
 * Put a block on its own lines. Text sharing the line is split off with a
 * blank line, and every line of the block keeps the quote and list indent of
 * the line it came from, so the block stays in its quote or list item.
 */
function onOwnLines(markdown: string, span: MathSpan, body: string): string {
  const start = lineStart(markdown, span.start)
  const before = markdown.slice(start, span.start)
  const lead = LEAD.exec(before)![0]
  const pad = lead.replace(/[^>\s]/g, ' ')
  const lineEnd = markdown.indexOf('\n', span.end)
  const after = markdown.slice(span.end, lineEnd < 0 ? markdown.length : lineEnd)

  let out = body.split('\n').join('\n' + pad)
  if (before !== lead) out = '\n\n' + pad + out
  if (after.trim() !== '') out += '\n\n' + pad
  return out
}

function isStandalone(markdown: string, start: number, end: number): boolean {
  const lineEnd = markdown.indexOf('\n', end)
  return (
    markdown.slice(lineStart(markdown, start), start).trim() === '' &&
    markdown.slice(end, lineEnd < 0 ? markdown.length : lineEnd).trim() === ''
  )
}

// ---------------------------------------------------------------------------
// Line positions

function lineStart(text: string, index: number): number {
  return text.lastIndexOf('\n', index - 1) + 1
}

/** Only quote markers, indentation, or a list marker come before `index` on its line. */
function opensLine(text: string, index: number): boolean {
  const before = text.slice(lineStart(text, index), index)
  return LEAD.exec(before)![0].length === before.length
}

/** The first blank line after `index`, which ends its paragraph. */
function paragraphEnd(text: string, index: number): number {
  BLANK_LINE.lastIndex = index
  return BLANK_LINE.exec(text)?.index ?? text.length
}

function isEscaped(text: string, index: number): boolean {
  let slashes = 0
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i--) slashes++
  return slashes % 2 === 1
}

// ---------------------------------------------------------------------------
// Block code: fenced and indented
//
// Both are recognized at the start of a line. `Layout` carries what earlier
// lines established. Indented code needs a blank line before it and, inside
// a list item, four columns beyond the item's text; otherwise a nested
// bullet or a continued paragraph would read as code.

type Layout = { listOffset: number; afterBlank: boolean }

/** Where code ends, and the fence still open when the text ran out inside one. */
type CodeBlock = { end: number; open?: string }

function indentWidth(text: string): number {
  let width = 0
  for (const c of /^[ \t]*/.exec(text)![0]) width += c === '\t' ? 4 - (width % 4) : 1
  return width
}

/** Update `layout` for the line at `index`, and return the code block that starts there. */
function enterLine(text: string, index: number, layout: Layout): CodeBlock | undefined {
  const eol = text.indexOf('\n', index)
  const content = text.slice(index, eol < 0 ? text.length : eol).replace(/\r$/, '').replace(QUOTE_PREFIX, '')
  if (content.trim() === '') {
    layout.afterBlank = true
    return undefined
  }

  const indent = indentWidth(content)
  let code: CodeBlock | undefined
  if (layout.afterBlank && indent >= layout.listOffset + 4) {
    code = { end: indentedCodeEnd(text, index, layout.listOffset + 4) }
  } else {
    const open = FENCE_OPEN.exec(content)
    // A backtick fence's info string has no backticks; otherwise it is inline code.
    if (open && !(open[1]![0] === '`' && open[2]!.includes('`'))) {
      const end = fenceEnd(text, eol < 0 ? text.length : eol + 1, open[1]!)
      code = end === undefined ? { end: text.length, open: open[1] } : { end }
    }
  }

  if (!code) {
    const marker = LIST_MARKER.exec(content)
    if (marker) {
      const gap = marker[3]!.length
      layout.listOffset = indentWidth(marker[1]!) + marker[2]!.length + (gap >= 1 && gap <= 4 ? gap : 1)
    } else if (layout.afterBlank && indent < layout.listOffset) {
      layout.listOffset = 0
    }
  }
  layout.afterBlank = code !== undefined
  return code
}

/** The index after the line that closes a fence opened with `run`, searching from `from`. */
function fenceEnd(text: string, from: number, run: string): number | undefined {
  for (let start = from; ; ) {
    const eol = text.indexOf('\n', start)
    const line = text.slice(start, eol < 0 ? text.length : eol).replace(/\r$/, '').replace(QUOTE_PREFIX, '')
    const close = FENCE_CLOSE.exec(line)?.[1]
    if (close && close[0] === run[0] && close.length >= run.length) return eol < 0 ? text.length : eol + 1
    if (eol < 0) return undefined
    start = eol + 1
  }
}

/** The start of the first line after `from` that is not blank or indented `width` columns. */
function indentedCodeEnd(text: string, from: number, width: number): number {
  for (let start = from; start < text.length; ) {
    const eol = text.indexOf('\n', start)
    const content = text.slice(start, eol < 0 ? text.length : eol).replace(/\r$/, '').replace(QUOTE_PREFIX, '')
    if (content.trim() !== '' && indentWidth(content) < width) return start
    if (eol < 0) break
    start = eol + 1
  }
  return text.length
}

// ---------------------------------------------------------------------------
// Inline code and verbatim spans

function countRun(text: string, index: number, char: string): number {
  let end = index
  while (text[end] === char) end++
  return end - index
}

/** The index after the code span opened by the backtick run at `index`; a run with no match is plain text. */
function skipInlineCode(text: string, index: number): number {
  const length = countRun(text, index, '`')
  const run = '`'.repeat(length)
  const limit = paragraphEnd(text, index)
  for (let from = index + length; from < limit; ) {
    const close = text.indexOf(run, from)
    if (close < 0 || close >= limit) break
    // The closer is a run of exactly the opener's length.
    if (text[close - 1] !== '`' && text[close + length] !== '`') return close + length
    from = close + 1
  }
  return index + length
}

/** The index after an HTML comment or `<code>` / `<pre>` element starting at `index`. */
function skipHtmlCode(text: string, index: number): number | undefined {
  if (text.startsWith('<!--', index)) {
    const close = text.indexOf('-->', index + 4)
    return close < 0 ? text.length : close + 3
  }

  HTML_CODE.lastIndex = index
  const open = HTML_CODE.exec(text)
  if (!open) return undefined
  const openEnd = text.indexOf('>', index + open[0].length - 1)
  if (openEnd < 0) return text.length

  const closer = new RegExp(`</${open[1]}>`, 'gi')
  closer.lastIndex = openEnd + 1
  const close = closer.exec(text)
  return close ? close.index + close[0].length : text.length
}

/** The index after a `\verb|…|` on one line. */
function skipVerb(text: string, index: number): number | undefined {
  if (!text.startsWith('\\verb', index) || /[A-Za-z]/.test(text[index + 5] ?? '')) return undefined
  let at = index + 5
  if (text[at] === '*') at++
  const delimiter = text[at]
  if (!delimiter || /[A-Za-z0-9\s]/.test(delimiter)) return undefined
  const close = text.indexOf(delimiter, at + 1)
  const eol = text.indexOf('\n', at)
  return close < 0 || (eol >= 0 && close > eol) ? undefined : close + 1
}

// ---------------------------------------------------------------------------
// Finding where a span ends

/** The first unescaped `seq` in [from, limit), skipping TeX comments and `\verb`. */
function findClose(text: string, seq: string, from: number, limit: number): number {
  for (let i = from; i < limit; i++) {
    const c = text[i]
    if (c === '%' && !isEscaped(text, i)) {
      const eol = text.indexOf('\n', i + 1)
      if (eol < 0) return -1
      i = eol
      continue
    }
    if (c === '\\' && !isEscaped(text, i)) {
      const verbEnd = skipVerb(text, i)
      if (verbEnd !== undefined) {
        i = verbEnd - 1
        continue
      }
    }
    if (text.startsWith(seq, i) && !isEscaped(text, i)) return i
  }
  return -1
}

/** The index after the `\end` that closes the environment opened just before `from`, counting nesting. */
function environmentEnd(text: string, from: number, name: string): number {
  const stack = [name]
  for (let i = from; i < text.length; i++) {
    const c = text[i]
    if (c === '%' && !isEscaped(text, i)) {
      const eol = text.indexOf('\n', i + 1)
      if (eol < 0) return -1
      i = eol
      continue
    }
    if (c !== '\\' || isEscaped(text, i)) continue

    const verbEnd = skipVerb(text, i)
    if (verbEnd !== undefined) {
      i = verbEnd - 1
      continue
    }

    ENV_TOKEN.lastIndex = i
    const token = ENV_TOKEN.exec(text)
    if (!token) continue
    if (token[1] === 'begin') {
      stack.push(token[2]!)
    } else if (stack.at(-1) === token[2]) {
      stack.pop()
      if (stack.length === 0) return i + token[0].length
    }
    i += token[0].length - 1
  }
  return -1
}

/** A `$` opens inline math when text follows it directly, as in `$x$` but not `$ x`. */
function opensInlineDollar(text: string, index: number): boolean {
  const next = text[index + 1]
  return next !== undefined && next !== '$' && !/\s/.test(next)
}

/** The `$` that closes inline math started before `from`, on the same line. */
function findInlineDollarClose(text: string, from: number): number {
  for (let i = from; i < text.length; i++) {
    const c = text[i]
    if (c === '\n' || c === '\r') return -1
    if (c !== '$' || isEscaped(text, i)) continue
    // Not a closer: part of `$$`, after a space, or before a digit ("$5 and $10").
    if (text[i - 1] === '$' || text[i + 1] === '$' || /\s/.test(text[i - 1] ?? '')) continue
    if (/\d/.test(text[i + 1] ?? '')) continue
    return i
  }
  return -1
}

function hasUnescapedDollar(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '$' && !isEscaped(text, i)) return true
  }
  return false
}
