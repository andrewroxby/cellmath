// Wraps Pi's Markdown so its LaTeX tokens are drawn by cellmath.
//
// Pi tokenizes LaTeX itself and converts each finished token with its own
// renderer inside Markdown.renderToken (display blocks) and renderInlineTokens
// (inline math). Pi offers no seam to swap that renderer, so this wraps those
// two prototype methods: cellmath converts each finished LaTeX token, and
// anything it cannot convert, along with every other token, goes to Pi as
// before. If Pi's methods change shape, the patch skips itself and warns.

import { renderLatex } from '../core/index.ts'

type Fn = (...args: any[]) => any
type LatexToken = { type: string; raw: string; text: string; pending?: boolean }

const INSTALLED = Symbol.for('cellmath.installed')

/** A finished LaTeX token of `type` that this Markdown is set to render. */
function convertible(markdown: any, token: any, type: string): token is LatexToken {
  return token?.type === type && !token.pending && typeof token.text === 'string' && markdown.options?.renderLatex !== false
}

/** Wrap Pi's Markdown; returns the uninstaller, or undefined when skipped. */
export function installCellmath(target: object): (() => void) | undefined {
  const proto = target as Record<string, Fn> & { [INSTALLED]?: boolean }
  const missing = ['renderToken', 'renderInlineTokens', 'applyDefaultStyle'].filter((name) => typeof proto[name] !== 'function')
  if (missing.length > 0) {
    console.warn(`cellmath: Pi's Markdown changed (${missing.join(', ')}); Pi's own LaTeX renderer stays in use`)
    return undefined
  }
  if (proto[INSTALLED]) return undefined

  const { renderToken, renderInlineTokens } = proto

  proto.renderToken = function (this: any, token: unknown, width: number, nextTokenType?: string, styleContext?: unknown) {
    const art = convertible(this, token, 'latexBlock') ? renderLatex(token.text, { display: true, ansi: true }) : undefined
    if (art === undefined) return renderToken.call(this, token, width, nextTokenType, styleContext)
    const lines: string[] = art.split('\n').map((line) => this.applyDefaultStyle(line))
    // Pi's own spacing after a display block.
    if (nextTokenType && nextTokenType !== 'space') lines.push('')
    return lines
  }

  // Inline math becomes an escape token, which Pi draws as plain styled text,
  // several rows when the math stacks, as Pi's own renderer does.
  proto.renderInlineTokens = function (this: any, tokens: unknown[], styleContext?: unknown) {
    const converted = tokens.map((token) => {
      if (!convertible(this, token, 'latex')) return token
      const text = renderLatex(token.text, { ansi: true })
      return text === undefined ? token : { type: 'escape', raw: text, text }
    })
    return renderInlineTokens.call(this, converted, styleContext)
  }

  proto[INSTALLED] = true
  return () => {
    proto.renderToken = renderToken
    proto.renderInlineTokens = renderInlineTokens
    delete proto[INSTALLED]
  }
}
