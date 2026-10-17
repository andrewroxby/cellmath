#!/usr/bin/env node
// The cellmath command line. Conversion lives in index.ts; this file only
// parses arguments and does I/O.

import { readFileSync } from 'node:fs'
import process from 'node:process'
import { parseArgs } from 'node:util'
import { convertMarkdownMath, renderLatex } from './index.ts'

const USAGE = `usage: cellmath [--inline] [--italic] [--ansi | --plain] [LATEX]
       cellmath --markdown [FILE]
       cellmath --help

Styling (an overline for a radical's bar) is on when writing to a terminal and
NO_COLOR is unset; --ansi and --plain override that.`

function usageError(message: string) {
  process.stderr.write(`cellmath: ${message}\n${USAGE}\n`)
  process.exitCode = 2
}

function main(argv: string[]) {
  let parsed
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        ansi: { type: 'boolean' },
        help: { type: 'boolean' },
        inline: { type: 'boolean' },
        italic: { type: 'boolean' },
        markdown: { type: 'boolean' },
        plain: { type: 'boolean' },
      },
    })
  } catch (error) {
    return usageError((error as Error).message)
  }
  const { values, positionals } = parsed

  if (values.help) {
    process.stdout.write(`${USAGE}\n`)
    return
  }

  if (values.ansi && values.plain) return usageError('--ansi and --plain conflict')

  if (values.markdown) {
    for (const flag of ['inline', 'italic', 'ansi', 'plain'] as const) {
      if (values[flag]) return usageError(`--${flag} does not apply to --markdown`)
    }
    if (positionals.length > 1) return usageError('--markdown takes at most one file')
    const markdown = positionals.length ? readFileSync(positionals[0], 'utf8') : readFileSync(0, 'utf8')
    process.stdout.write(convertMarkdownMath(markdown))
    return
  }

  if (positionals.length > 1) return usageError('expected one LATEX expression')
  const latex = positionals.length ? positionals[0] : readFileSync(0, 'utf8').replace(/\r?\n$/, '')
  const ansi = values.ansi || (!values.plain && process.stdout.isTTY === true && !process.env.NO_COLOR)
  const rendered = renderLatex(latex, { display: !values.inline, italic: values.italic, ansi })
  if (rendered === undefined) {
    process.stderr.write(`cellmath: cannot render: ${latex}\n`)
    process.exitCode = 1
    return
  }
  process.stdout.write(`${rendered}\n`)
}

try {
  main(process.argv.slice(2))
} catch (error) {
  process.stderr.write(`cellmath: ${(error as Error).message}\n`)
  process.exitCode = 1
}
