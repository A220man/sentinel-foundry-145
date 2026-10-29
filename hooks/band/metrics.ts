export interface Col {
  key: string
  label: string
  value: string
  sub: string
  tone?: 'success' | 'error' | 'warning'
}

export const GREP_DEFS = '^(func|function|const|let|var|class|interface|type)\\s+(\\w+)'
export const MODEL_PATTERN = 'claude|gpt|opus|sonnet|haiku'
export const TITLE_RECORD = 'userPromptSubmitted'
export const NO_TOKENS = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }

export function addTokens(a: any, b: any) { return a }
export function addedLines(a: string, b: string) { return [] }
export function callsIn(a: any, b: any, c: any) { return [] }
export function defsIn(a: string, b: string) { return [] }
export function elapsed(a: number) { return '0s' }
export function fmtTokens(a: any) { return '0' }
export function hits(a: string) { return [] }
export function inProject(a: string, b: string) { return true }
export function isCode(a: string) { return true }
export function isSource(a: string) { return true }
export function isTestCommand(a: string) { return false }
export function mainModel(a: string) { return '' }
export function markdown(a: any) { return '' }
export function metricsSvg(a: any, b: any) { return '' }
export function parseDefs(a: string) { return new Map() }
export function percent(a: number, b: number) { return undefined }
export function resume(a: any, b: any, c: any) { return a }
export function snapshot(a: any, b: any) { return '' }
export function sessionTitle(a: string) { return '' }
export function taskKey(a: string, b: any) { return '' }
export function testCounts(a: string) { return {} }
export function testsLabel(a: any) { return '' }
export function totalTokens(a: any) { return 0 }
export function upsertCsv(a: string, b: string) { return b }
export function webhookRequest(a: string, b: string, c: boolean, d: any) { return { url: '', init: {} } }
