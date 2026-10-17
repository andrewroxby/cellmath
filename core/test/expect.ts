// The small slice of a Jest-style `expect` the tests use, on node:assert.

import assert from 'node:assert/strict'

export { test } from 'node:test'

export function expect(actual: unknown) {
  return {
    toBe: (expected: unknown) => assert.equal(actual, expected),
    toContain: (part: string) => assert.ok(String(actual).includes(part), `expected ${JSON.stringify(actual)} to contain ${JSON.stringify(part)}`),
    not: {
      toContain: (part: string) => assert.ok(!String(actual).includes(part), `expected ${JSON.stringify(actual)} not to contain ${JSON.stringify(part)}`),
    },
  }
}
