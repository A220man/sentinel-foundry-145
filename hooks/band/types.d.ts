export interface Band {
  level: 'off' | 'lite' | 'full' | 'ultra'
  model: string
  cost: number
  spent: number
  turns: number
  turnCosts: number[]
  tokens: Tokens
  busyMs: number
  name: string
  project: string
  session: string
  transcript: string
  reused: string[]
  created: string[]
  removed: string[]
  openCallers: string[]
  tests: { state: 'none' | 'pass' | 'fail' | 'stale'; passed?: number; failed?: number }
  details: boolean
}

export interface Tokens {
  input: number
  output: number
  cacheRead: number
  cacheWrite: number
}
