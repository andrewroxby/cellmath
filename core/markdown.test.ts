import assert from 'node:assert/strict'
import { expect, test } from './test/expect.ts'
import { convertMarkdown, convertMarkdownMath, expandMath, type MathReplacement, type MathSpan } from './markdown.ts'

test('inline math becomes Unicode text', () => {
  expect(convertMarkdownMath('Einstein: $E=mc^2$ and $\\alpha_1$.')).toBe('Einstein: E = mc² and α₁.')
})

test('display math becomes a code block of Unicode art', () => {
  const out = convertMarkdownMath('Before\n\n$$\\frac{1}{2}$$\n\nAfter')
  expect(out).toContain('```\n')
  expect(out).not.toContain('\\frac')
})

test('code, currency, and unclosed spans stay as written', () => {
  const src = 'Costs $5 and $10. `$x$` stays.\n\n```\n$$\\frac{a}{b}$$\n```\n\n$$\\begin{bmatrix} 1'
  expect(convertMarkdownMath(src)).toBe(src)
})

test('converting converted text changes nothing', () => {
  const src = [
    'Inline $[0,1]$ and $\\$5$ and $x_{\\text{max}}$.',
    '$[a,b]$ starts a line.',
    '',
    '$$\\frac{1}{2}$$',
    '',
    'Costs $5 and $10.',
  ].join('\n')
  const once = convertMarkdownMath(src)
  expect(convertMarkdownMath(once)).toBe(once)
})

test('an unclosed display block is held until it closes', () => {
  const first = convertMarkdown('Intro $x^2$.\n$$\n\\frac{a}{b}\n', { hold: true })
  expect(first.text).toBe('Intro x².\n')
  expect(first.held).toBe('$$\n\\frac{a}{b}\n')
  const second = convertMarkdown(first.held + '$$\nAfter.\n', { fence: first.fence, hold: true })
  expect(second.text).toBe('```\na\n─\nb\n```\nAfter.\n')
  expect(second.held).toBe('')
})

test('a code fence left open by one flush shields the next', () => {
  const first = convertMarkdown('```\n', { hold: true })
  expect(first.fence).toBe('```')
  expect(convertMarkdown('$x$\n```\n', { fence: first.fence, hold: true }).text).toBe('$x$\n```\n')
})

// expandMath, with a stand-in renderer so the scanner is tested on its own.

const bracket = (span: MathSpan) => `⟦${span.latex}⟧`
const expand = (markdown: string, render: (span: MathSpan) => MathReplacement = bracket) => expandMath(markdown, render).text

test('renders dollar and parenthesized inline math', () => {
  expect(expand('A $x^2+1$ and \\(y_1\\).')).toBe('A ⟦x^2+1⟧ and ⟦y_1⟧.')
})

test('reports whether a span occupies its whole line', () => {
  const seen: Array<{ latex: string; standalone: boolean }> = []
  expandMath('若 \\(n>2\\)，则继续。\n\\(x^2+y^2=z^2\\)', (span) => {
    seen.push({ latex: span.latex, standalone: span.standalone })
    return undefined
  })
  assert.deepEqual(seen, [
    { latex: 'n>2', standalone: false },
    { latex: 'x^2+y^2=z^2', standalone: true },
  ])
})

test('reports span offsets and kind', () => {
  const seen: MathSpan[] = []
  expandMath('a $x$ b\n$$ y $$', (span) => {
    seen.push(span)
    return undefined
  })
  assert.deepEqual(seen, [
    { latex: 'x', display: false, start: 2, end: 5, standalone: false },
    { latex: 'y', display: true, start: 8, end: 15, standalone: true },
  ])
})

test('a standalone display span is replaced in place', () => {
  expect(expand('Before\n$$\\frac{1}{2}$$\nAfter')).toBe('Before\n⟦\\frac{1}{2}⟧\nAfter')
})

test('display math sharing a line is set off from its text', () => {
  expect(expand('Then $$x$$ holds.')).toBe('Then \n\n⟦x⟧\n\n holds.')
})

test('multi-line inline output takes its own lines', () => {
  expect(expand('value $x/y$ here', () => ' x\n───\n y')).toBe('value \n\n x\n───\n y\n\n here')
})

test('a renderer can force an inline span into a block', () => {
  expect(expand('value $x/y$ here', () => ({ text: '<IMG>', block: true }))).toBe('value \n\n<IMG>\n\n here')
})

test('a block keeps the indent of the list item or quote it sits in', () => {
  const art = () => ({ text: 'a\n─\nb', block: true })
  expect(expand('1. Step\n   $$x$$', art)).toBe('1. Step\n   a\n   ─\n   b')
  expect(expand('> $$x$$', art)).toBe('> a\n> ─\n> b')
  expect(expand('- $$x$$', art)).toBe('- a\n  ─\n  b')
  expect(expand('- Then $$x$$', art)).toBe('- Then \n\n  a\n  ─\n  b')
})

test('surrounding whitespace and CRLF in rendered text are normalized', () => {
  expect(expand('$$x$$', () => '\r\nA\r\nB\r\n')).toBe('A\nB')
})

test('a renderer that declines, returns blank text, or throws leaves the source', () => {
  const src = '$a$ $b$ $c$'
  const render = (span: MathSpan): string | undefined => {
    if (span.latex === 'b') return '  '
    if (span.latex === 'c') throw new Error('boom')
    return undefined
  }
  expect(expand(src, render)).toBe(src)
})

test('fenced, inline, and HTML code stay untouched', () => {
  const src = [
    '```ts',
    "const formula = '$not_math$';",
    '```',
    '`$also_not_math$` and $yes$',
    '<code>$still_not_math$</code>',
    '<PRE>\n$nor_this$\n</PRE>',
  ].join('\n')
  expect(expand(src)).toBe(src.replace('$yes$', '⟦yes⟧'))
})

test('tilde fences, indented fences, and quoted fences shield their contents', () => {
  const src = ['~~~', '$a$', '~~~', '- item', '  ```', '  $b$', '  ```', '> ```', '> $c$', '> ```', '$d$'].join('\n')
  expect(expand(src)).toBe(src.replace('$d$', '⟦d⟧'))
})

test('a longer fence is closed only by an equal or longer bare one', () => {
  const src = ['````', '```', '$a$', '```', '````', '$b$'].join('\n')
  expect(expand(src)).toBe(src.replace('$b$', '⟦b⟧'))
  const unclosed = ['```', '$a$', '```js', '$b$'].join('\n')
  expect(expandMath(unclosed, bracket).fence).toBe('```')
})

test('a backtick fence line with backticks in it is inline code, not a fence', () => {
  expect(expand('```x``` $a$\n$b$')).toBe('```x``` ⟦a⟧\n⟦b⟧')
})

test('inline code honors longer backtick runs', () => {
  expect(expand('``a ` $x$ ` b`` and $y$')).toBe('``a ` $x$ ` b`` and ⟦y⟧')
  expect(expand('`a` $x$ `b`')).toBe('`a` ⟦x⟧ `b`')
})

test('an unmatched backtick does not shield the math after it', () => {
  expect(expand("It`s $x$ here")).toBe('It`s ⟦x⟧ here')
  expect(expand('A ` stray.\n\n$x$ and `$y$`')).toBe('A ` stray.\n\n⟦x⟧ and `$y$`')
})

test('an escaped backtick opens no code span', () => {
  expect(expand('\\`$x$\\`')).toBe('\\`⟦x⟧\\`')
})

test('TeX verbatim commands and HTML comments stay untouched', () => {
  const src = '\\verb|$not_math$| <!-- \\(also_not_math\\) --> and $yes$'
  expect(expand(src)).toBe(src.replace('$yes$', '⟦yes⟧'))
})

test('an unclosed \\verb shields nothing', () => {
  expect(expand('\\verb|oops\n$x$')).toBe('\\verb|oops\n⟦x⟧')
})

test('indented code blocks stay untouched', () => {
  expect(expand('    $x^2$\n\n    \\(y_1\\)\n$z$')).toBe('    $x^2$\n\n    \\(y_1\\)\n⟦z⟧')
  expect(expand('Intro\n\n\t$x$\n\n$y$')).toBe('Intro\n\n\t$x$\n\n⟦y⟧')
})

test('indented lines in lists and paragraphs are prose, not code', () => {
  expect(expand('Text\n    $x$ continues')).toBe('Text\n    ⟦x⟧ continues')
  expect(expand('- item\n    - nested $x$')).toBe('- item\n    - nested ⟦x⟧')
  expect(expand('- item\n\n    more $x$\n\n$y$')).toBe('- item\n\n    more ⟦x⟧\n\n⟦y⟧')
  expect(expand('- item\n\n          $code$\n\n$y$')).toBe('- item\n\n          $code$\n\n⟦y⟧')
})

test('escaped dollars, prices, incomplete spans, and rejected spans stay as written', () => {
  const src = 'Pay \\$5 or $10 today; incomplete $x and $bad$.'
  expect(expand(src, (span) => (span.latex === 'bad' ? undefined : bracket(span)))).toBe(src)
})

test('a dollar span with a backtick in it is not math', () => {
  const src = 'Cost $5 and `$HOME` and $7.'
  expect(expand(src)).toBe(src)
})

test('a price range is not math', () => {
  expect(expand('From $5-$10 or $3.')).toBe('From $5-$10 or $3.')
})

test('inline \\( does not run past its paragraph', () => {
  expect(expand('a \\( stray\n\nb \\(x\\)')).toBe('a \\( stray\n\nb ⟦x⟧')
})

test('inline \\( may wrap across lines', () => {
  expect(expand('a \\(x +\ny\\) b', () => 'R')).toBe('a R b')
})

test('\\[ opens display math only at the start of a line', () => {
  expect(expand('\\[ x \\]')).toBe('⟦x⟧')
  expect(expand('  \\[\n x\n\\]')).toBe('  ⟦x⟧')
  expect(expand('see \\[1\\] and \\[2\\]')).toBe('see \\[1\\] and \\[2\\]')
})

test('top-level environments are display math', () => {
  expect(expand('\\begin{equation}a=b\\end{equation}')).toBe('⟦\\begin{equation}a=b\\end{equation}⟧')
  expect(expand('x \\begin{math}y\\end{math} z')).toBe('x ⟦\\begin{math}y\\end{math}⟧ z')
  expect(expand('\\begin{itemize}x\\end{itemize}')).toBe('\\begin{itemize}x\\end{itemize}')
})

test('closers inside TeX comments are ignored and environments nest', () => {
  const seen: string[] = []
  const grab = (span: MathSpan) => {
    seen.push(span.latex)
    return 'R'
  }
  expect(expand('$$a % $$ ignored\n + b$$', grab)).toBe('R')
  const nested = '\\begin{aligned}\na&=\\begin{aligned}b&=c\\\\d&=e\\end{aligned}\\\\\nf&=g % \\end{aligned} ignored\n\\end{aligned}'
  expect(expand(nested, grab)).toBe('R')
  assert.deepEqual(seen, ['a % $$ ignored\n + b', nested])
})

test('an unclosed environment is held, and an unclosed \\[ too', () => {
  const env = expandMath('Hi\n\\begin{align}\na&=b\n', bracket, { hold: true })
  expect(env.text).toBe('Hi\n')
  expect(env.held).toBe('\\begin{align}\na&=b\n')
  const bracketed = expandMath('Hi\n\\[\nx\n', bracket, { hold: true })
  expect(bracketed.held).toBe('\\[\nx\n')
})

test('held text keeps its indentation and earlier same-line math is converted', () => {
  const indented = expandMath('A\n  $$\nx', bracket, { hold: true })
  expect(indented.text).toBe('A\n')
  expect(indented.held).toBe('  $$\nx')
  const midLine = expandMath('See $a$ then $$\nx', bracket, { hold: true })
  expect(midLine.text).toBe('See ⟦a⟧ then ')
  expect(midLine.held).toBe('$$\nx')
})

test('without hold an unclosed display block stays as written', () => {
  const src = 'Hi\n$$\nx'
  expect(expand(src)).toBe(src)
  expect(expandMath(src, bracket).held).toBe('')
})

test('a fence left open is reported, and a closed one is not', () => {
  expect(expandMath('```\n$x$', bracket).fence).toBe('```')
  expect(expandMath('```\n$x$\n```\n$y$', bracket).fence).toBe(undefined)
  expect(expandMath('more\n```\n$z$', bracket, { fence: '```' }).fence).toBe(undefined)
})

// convertMarkdown presentation

test('display math keeps the indent of the list item it sits in', () => {
  const out = convertMarkdownMath('1. Step\n   $$\\frac{1}{2}$$\n2. Next')
  expect(out).toBe('1. Step\n   ```\n   1\n   ─\n   2\n   ```\n2. Next')
  expect(convertMarkdownMath(out)).toBe(out)
})

test('display math sharing a line becomes a block between its text', () => {
  const out = convertMarkdownMath('so $$\\frac{1}{2}$$ holds')
  expect(out).toBe('so \n\n```\n1\n─\n2\n```\n\n holds')
  expect(convertMarkdownMath(out)).toBe(out)
})

test('environments render as display blocks', () => {
  const out = convertMarkdownMath('\\begin{equation}a=b\\end{equation}')
  expect(out).toBe('```\na = b\n```')
})

test('inline output that spans lines stays as written', () => {
  const src = 'a $\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$ b'
  expect(convertMarkdownMath(src)).toBe(src)
})

test('converted text with block quotes and nested lists survives a second pass', () => {
  const src = '> $$\\frac{a}{b}$$\n\n- item $x_1$\n    - deep $\\alpha$\n\n    para $\\beta$'
  const once = convertMarkdownMath(src)
  expect(once).toContain('> ```')
  expect(convertMarkdownMath(once)).toBe(once)
})
