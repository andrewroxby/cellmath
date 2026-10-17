// cellmath for Pi: Pi's Markdown draws its LaTeX with cellmath's converter.
// patch.ts holds the mechanism; this entry point applies it to the Markdown
// class Pi supplies.

import type { ExtensionAPI } from '@earendil-works/pi-coding-agent'
import { Markdown } from '@earendil-works/pi-tui'
import { installCellmath } from './patch.ts'

export default function cellmath(pi: ExtensionAPI): void {
  const uninstall = installCellmath(Markdown.prototype)
  pi.on('session_shutdown', () => uninstall?.())
}
