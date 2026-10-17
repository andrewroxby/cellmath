import { expect, test } from './test/expect.ts'
import { renderLatex } from './convert.ts'

const display = (src: string) => renderLatex(src, { display: true })

// Braces

test('underbraces draw a brace and a centered label under each base', () => {
  const src = String.raw`\underbrace{1.2^{1}}_{\text{zoom}} \times \underbrace{0.6}_{\text{width per em}} = x`
  expect(display(src)).toBe(
    ['1.2¹ ×     0.6      = x', '╰┬─╯       ╰┬╯', 'zoom   width per em'].join('\n'),
  )
})

test('a brace shares the grid with a stacked fraction', () => {
  expect(display(String.raw`\frac{1}{2} + \underbrace{a + b}_{\text{sum}}`)).toBe(
    ['1', '─ + a + b', '2   ╰─┬─╯', '     sum'].join('\n'),
  )
})

test('a bare label and a missing label both work', () => {
  expect(display(String.raw`\underbrace{x}_n + 1`)).toBe(['x + 1', '┬', 'n'].join('\n'))
  expect(display(String.raw`\underbrace{abc} = d`)).toBe(['abc = d', '╰┬╯'].join('\n'))
})

test('braces sit inside fractions and span stacked bases', () => {
  expect(display(String.raw`\frac{\underbrace{a}_{b}}{c}`)).toBe(['a', '┬', 'b', '─', 'c'].join('\n'))
  expect(display(String.raw`x = \underbrace{\frac{1}{2}}_{h} + 1`)).toBe(
    ['    1', 'x = ─ + 1', '    2', '    ┬', '    h'].join('\n'),
  )
})

test('inline math flattens a brace to its base', () => {
  expect(renderLatex(String.raw`\underbrace{a + b}_{n}`)).toBe('a + bₙ')
})

test('overbraces draw the brace and label above the base', () => {
  expect(display(String.raw`\overbrace{a + b}^{\text{sum}} = c`)).toBe(
    [' sum', '╭─┴─╮', 'a + b = c'].join('\n'),
  )
})

test('both kinds share one formula', () => {
  expect(display(String.raw`\overbrace{x}^{n} + \underbrace{y}_{m}`)).toBe(['n', '┴', 'x + y', '    ┬', '    m'].join('\n'))
})

// Alignments and matrices

test('aligned right-aligns the left side and lines up each &', () => {
  expect(display(String.raw`\begin{aligned} a &= b + c \\ &= d \end{aligned}`)).toBe('a = b + c\n  = d')
})

test('align pairs share columns, with a gutter between pairs', () => {
  const src = String.raw`\begin{align*} x &= 1 & y &= 22 \\ xx &= 333 & yy &= 4 \end{align*}`
  expect(display(src)).toBe(' x = 1      y = 22\nxx = 333   yy = 4')
})

test('a stacked row is set off by blank lines', () => {
  const src = String.raw`\begin{aligned} y &= \frac{a}{b} \\ &= c \end{aligned}`
  expect(display(src)).toBe(['    a', 'y = ─', '    b', '', '  = c'].join('\n'))
})

test('aligned rows can hold braces', () => {
  const src = String.raw`\begin{aligned} S &= \underbrace{a + b}_{\text{two}} \\ &= c \end{aligned}`
  expect(display(src)).toBe(['S = a + b', '    ╰─┬─╯', '     two', '', '  = c'].join('\n'))
})

test('matrices drop the │ between columns', () => {
  expect(display(String.raw`\begin{pmatrix} 1 & 20 \\ 300 & 4 \end{pmatrix}`)).toBe('╭ 1     20 ╮\n╰ 300   4  ╯')
})

test('taller matrices run their delimiters down the middle rows', () => {
  expect(display(String.raw`\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}`)).toBe('╭ 1 ╮\n│ 2 │\n╰ 3 ╯')
  expect(display(String.raw`\begin{Bmatrix} a \\ b \\ c \end{Bmatrix}`)).toBe('╭ a ╮\n┤ b ├\n╰ c ╯')
})

test('a determinant keeps its bars', () => {
  expect(display(String.raw`D = \begin{vmatrix} a & b \\ c & d \end{vmatrix}`)).toBe('D = │ a   b │\n    │ c   d │')
})

test('an array that asks for rules keeps them', () => {
  expect(display(String.raw`\begin{array}{c|c} 1 & 2 \\ 3 & 4 \end{array}`)).toBe('1 │ 2\n3 │ 4')
})

test('labels and tags in alignments vanish', () => {
  expect(display(String.raw`\begin{aligned} a &= b \label{eq} \notag \\ &= c \end{aligned}`)).toBe('a = b\n  = c')
})
