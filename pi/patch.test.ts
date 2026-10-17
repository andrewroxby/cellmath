// Runs the patch against the pi-tui of the installed Pi, the class it wraps at
// runtime. Without a Pi install the tests skip.

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { expect, test } from '../core/test/expect.ts'
import { installCellmath } from './patch.ts'

const hostPiTui = (() => {
  try {
    const root = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim()
    const entry = join(root, '@earendil-works/pi-coding-agent/node_modules/@earendil-works/pi-tui/dist/index.js')
    return existsSync(entry) ? entry : undefined
  } catch {
    return undefined
  }
})()

const identity = (text: string) => text
const theme = Object.fromEntries(
  ['heading', 'link', 'linkUrl', 'code', 'codeBlock', 'codeBlockBorder', 'quote', 'quoteBorder', 'hr', 'listBullet', 'bold', 'italic', 'strikethrough', 'underline'].map((key) => [key, identity]),
)

const skip = hostPiTui === undefined ? 'no installed Pi to patch' : undefined

async function withPatch(check: (render: (markdown: string, options?: object) => string) => void) {
  const { Markdown } = await import(pathToFileURL(hostPiTui!).href)
  const uninstall = installCellmath(Markdown.prototype)
  try {
    check((markdown, options) => new Markdown(markdown, 0, 0, theme, undefined, options).render(80).map((line: string) => line.trimEnd()).join('\n').trim())
  } finally {
    uninstall?.()
  }
}

test('display math is drawn by cellmath, with an overlined radical', { skip }, () =>
  withPatch((render) => {
    expect(render('$$x = \\sqrt{a + b}$$')).toBe('x = ╲╱\x1b[53m a + b\x1b[55m')
    expect(render('$$A = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$$')).toBe('A = ╭ 1 ╮\n    ╰ 2 ╯')
  }))

test('inline math is drawn by cellmath', { skip }, () =>
  withPatch((render) => {
    expect(render('Shares $\\Psi_A + \\Psi_U = 1$ hold.')).toBe('Shares Ψᴀ + Ψᴜ = 1 hold.')
    expect(render('Inline $A = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ here.')).toContain('╭ 1 ╮')
  }))

test("Pi's own handling stays for disabled, pending, and unconvertible math", { skip }, () =>
  withPatch((render) => {
    expect(render('$$\\Psi_A$$', { renderLatex: false })).toBe('$$\\Psi_A$$')
    expect(render('Value $\\Psi_A')).toBe('Value $\\Psi_A')
  }))

test('the patch installs once and uninstalls cleanly', { skip }, async () => {
  const { Markdown } = await import(pathToFileURL(hostPiTui!).href)
  const original = Markdown.prototype.renderToken
  const uninstall = installCellmath(Markdown.prototype)
  expect(installCellmath(Markdown.prototype)).toBe(undefined)
  uninstall?.()
  expect(Markdown.prototype.renderToken).toBe(original)
})

test('a Markdown without the expected methods is left alone', () => {
  const warn = console.warn
  console.warn = () => {}
  try {
    expect(installCellmath({})).toBe(undefined)
  } finally {
    console.warn = warn
  }
})
