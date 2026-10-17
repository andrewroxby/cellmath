import { expect, test } from 'claude-code/testing'

test('streamed flushes display converted, with display blocks held whole', async ($, on) => {
  on('classic.MessageDisplay', () => ({}))
  const flush = (index: number, delta: string, final = false) =>
    $.classic.MessageDisplay({ turn_id: 't', message_id: 'm', index, final, delta })
  expect((await flush(0, 'Plain line.\n')).displayContent).toBe(undefined)
  expect((await flush(1, 'Energy $E=mc^2$.\n')).displayContent).toBe('Energy E = mc².\n')
  expect((await flush(2, '$$\n\\frac{1}{2}\n')).displayContent).toBe('')
  expect((await flush(3, '$$\nDone.', true)).displayContent).toBe('```\n1\n─\n2\n```\nDone.')
})
