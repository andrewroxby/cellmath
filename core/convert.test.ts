import { expect, test } from './test/expect.ts'
import { renderLatex } from './convert.ts'

const display = (src: string) => renderLatex(src, { display: true })

test('Greek and capital scripts use Unicode where it has them', () => {
  expect(renderLatex(String.raw`\tau_{il}^{\alpha} + A^{T} + x_\beta`)).toBe('τᵢₗᵅ + Aᵀ + xᵦ')
})

test('subscripts of capitals use small capitals', () => {
  expect(renderLatex(String.raw`\Psi_A + \Psi_{AB} + x_X + q_Q`)).toBe('\u03a8\u1d00 + \u03a8\u1d00\u0299 + xx + q\ua7af')
})

test('subscript letters Unicode cannot lower use small capitals, digits stay lowered', () => {
  expect(renderLatex(String.raw`x_b + C_d + x_{ab} + \Psi_{A1} + x_{ij}`)).toBe('xʙ + Cᴅ + xᴀʙ + Ψᴀ₁ + xᵢⱼ')
})

test('superscript C, S, X and Z borrow the lowercase forms; F, Q, Y and Greek gaps fall back', () => {
  expect(renderLatex(String.raw`A^{C} + A^{S} + A^{X} + A^{Z}`)).toBe('Aᶜ + Aˢ + Aˣ + Aᶻ')
  expect(renderLatex(String.raw`A^{F} + L_\theta + e^{\lambda t}`)).toBe('A^F + L_θ + e^(λt)')
})

test('the space after a letter command only ends its name', () => {
  expect(renderLatex(String.raw`\Psi_A(t + \Delta t) = e^{\lambda t}`)).toBe('\u03a8\u1d00(t + \u0394t) = e^(\u03bbt)')
  expect(renderLatex(String.raw`\alpha + \beta \cdot \Delta \tau`)).toBe('\u03b1 + \u03b2 \u00b7 \u0394 \u03c4')
})

test('a starred superscript stays on the line', () => {
  expect(renderLatex(String.raw`\sigma^* = x^{\ast}`, { display: true })).toBe('\u03c3* = x*')
})

test('math alphabets map letters and digits', () => {
  expect(renderLatex(String.raw`\mathcal{L} \mathbb{R} \mathbf{v} \mathfrak{g} \mathbb{1}`)).toBe('ℒ ℝ 𝐯 𝔤 𝟙')
})

test('italic sets variables in math italic and leaves text and operators upright', () => {
  const src = String.raw`x + \text{if } y = \sin x + \operatorname{rank} A`
  expect(renderLatex(src, { italic: true })).toBe('𝑥 + if 𝑦 = sin 𝑥 + rank 𝐴')
  expect(renderLatex(String.raw`\mathbb{R}^n + x_i`, { italic: true })).toBe('ℝⁿ + 𝑥ᵢ')
})

test('display radicals draw a bar over the radicand', () => {
  expect(display(String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`)).toBe(
    ['           ▁▁▁▁▁▁▁▁▁', '    -b ± ╲╱ b² - 4ac', 'x = ────────────────', '           2a'].join('\n'),
  )
  expect(display(String.raw`\sqrt{\frac{a}{b}}`)).toBe(['    ▁▁', '   ╱ a', '  ╱  ─', '╲╱   b'].join('\n'))
  expect(display(String.raw`\sqrt{2} + \sqrt[3]{x}`)).toBe('√2 + ∛x')
})

test('with ansi, a radical overlines its radicand instead of drawing a bar row', () => {
  const ansi = (src: string) => renderLatex(src, { display: true, ansi: true })
  expect(ansi(String.raw`x = \sqrt{a + b}`)).toBe('x = ╲╱\x1b[53m a + b\x1b[55m')
  expect(ansi(String.raw`\sqrt{\frac{a}{b}}`)).toBe(['   ╱\x1b[53m a\x1b[55m', '  ╱  ─', '╲╱   b'].join('\n'))
  expect(ansi(String.raw`\begin{aligned} r &= \sqrt{x^2 + y^2} \\ &= 1 \end{aligned}`)).toBe('r = ╲╱\x1b[53m x² + y²\x1b[55m\n  = 1')
})

test('cases draw a brace from box-drawing pieces, its point on the middle row', () => {
  expect(display(String.raw`f(x) = \begin{cases} 1 & x > 0 \\ 0 & \text{otherwise} \end{cases}`)).toBe(
    ['       ╭ 1 if x > 0', 'f(x) = ┤', '       ╰ 0 otherwise'].join('\n'),
  )
})

test('display integrals stand three rows tall', () => {
  expect(display(String.raw`\int_0^1 f(x)\,dx`)).toBe(['1', '╭', '│ f(x) dx', '╯', '0'].join('\n'))
})

test('a stacked operator keeps the space written before it', () => {
  expect(display(String.raw`a + \sum_{k} b_k`)).toBe(['a + ∑ bₖ', '    k'].join('\n'))
})

test('left and right delimiters grow around a stacked body', () => {
  expect(display(String.raw`\left( v - \frac{1}{v} \right) \varepsilon`)).toBe(
    ['╭    1╮', '│v - ─│ ε', '╰    v╯'].join('\n'),
  )
  expect(display(String.raw`\left[ \frac{a}{b} \right]`)).toBe(['┌a┐', '│─│', '└b┘'].join('\n'))
  expect(display(String.raw`\left\{ \frac{a}{b} \right.`)).toBe(['╭a', '┤─', '╰b'].join('\n'))
})

test('delimiters stay one row around a single line or a hanging script', () => {
  expect(renderLatex(String.raw`\left( \frac{1}{2} \right)`)).toBe('(1/2)')
  expect(display(String.raw`\left(\Psi_A\right)`)).toBe('(Ψᴀ)')
  expect(display(String.raw`\left(L_\theta\right)`)).toBe(['(L )', '  θ'].join('\n'))
})

test('an unmatched left reads as its delimiter', () => {
  expect(display(String.raw`\left( x`)).toBe('( x')
})

test('commands named like Object.prototype members are unknown, not inherited', () => {
  for (const src of [String.raw`\constructor`, String.raw`\toString x`, String.raw`\not\hasOwnProperty`]) {
    expect(renderLatex(src)).toBe(undefined)
  }
})
