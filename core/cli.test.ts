// Runs the CLI as a child process and checks its output and exit status.

import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { expect, test } from './test/expect.ts'

const CLI = fileURLToPath(new URL('./cli.ts', import.meta.url))

function cli(args: string[], input = '') {
  return spawnSync(process.execPath, [CLI, ...args], { input, encoding: 'utf8' })
}

test('renders an inline expression on one row', () => {
  const result = cli(['--inline', '\\frac{1}{2}'])
  expect(result.status).toBe(0)
  expect(result.stdout).toBe('1/2\n')
})

test('renders a display fraction on three rows', () => {
  const result = cli(['\\frac{1}{2}'])
  expect(result.status).toBe(0)
  expect(result.stdout.trimEnd().split('\n').length).toBe(3)
})

test('reads the expression from stdin', () => {
  const result = cli(['--inline'], '\\frac{1}{2}\n')
  expect(result.status).toBe(0)
  expect(result.stdout).toBe('1/2\n')
})

test('converts Markdown math read from stdin', () => {
  const result = cli(['--markdown'], 'Energy $E=mc^2$.\n')
  expect(result.status).toBe(0)
  expect(result.stdout).toBe('Energy E = mc².\n')
})

test('reports an unsupported expression on stderr and exits 1', () => {
  const result = cli(['\\frac{1}'])
  expect(result.status).toBe(1)
  expect(result.stdout).toBe('')
  expect(result.stderr).toContain('cellmath: cannot render: \\frac{1}')
})

test('rejects an unknown flag with exit 2', () => {
  const result = cli(['--bogus'])
  expect(result.status).toBe(2)
  expect(result.stderr).toContain('usage: cellmath')
})

test('rejects --italic with --markdown with exit 2', () => {
  const result = cli(['--markdown', '--italic'], 'Energy $E=mc^2$.\n')
  expect(result.status).toBe(2)
  expect(result.stdout).toBe('')
  expect(result.stderr).toContain('--italic does not apply to --markdown')
})

test('prints usage on stdout for --help', () => {
  const result = cli(['--help'])
  expect(result.status).toBe(0)
  expect(result.stdout).toContain('usage: cellmath')
})

test('--ansi overlines a radical; piped output defaults to the plain bar', () => {
  expect(cli(['--ansi', '\\sqrt{a} + \\sqrt{x + 1}']).stdout).toBe('√a + ╲╱\x1b[53m x + 1\x1b[55m\n')
  expect(cli(['\\sqrt{x + 1}']).stdout).toBe('  ▁▁▁▁▁▁\n╲╱ x + 1\n')
  expect(cli(['--ansi', '--plain', 'x']).status).toBe(2)
})
