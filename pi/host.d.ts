// The slice of Pi's host packages this extension touches. Pi supplies the
// real modules at load; these declarations let the repo type-check without
// installing them.

declare module '@earendil-works/pi-tui' {
  export class Markdown {
    constructor(text: string, paddingX: number, paddingY: number, theme: unknown, defaultTextStyle?: unknown, options?: unknown)
    render(width: number): string[]
  }
}

declare module '@earendil-works/pi-coding-agent' {
  export type ExtensionAPI = { on(event: string, handler: (...args: any[]) => unknown): void }
}
