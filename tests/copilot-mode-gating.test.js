// Test for Copilot mode gating (issue #1133)

const { writeHookOutput, supportsMidSessionUpdate, getEffectiveMode } = require('../hooks/ponytail-runtime')
const { handleModeCommand } = require('../hooks/ponytail-mode-tracker')

describe('Copilot mode gating', () => {
  describe('writeHookOutput', () => {
    test('emits additionalContext for SessionStart on Copilot', () => {
      const result = writeHookOutput('SessionStart', { test: 'context' }, true)
      expect(result).toEqual({ additionalContext: { test: 'context' } })
    })

    test('returns empty object for UserPromptSubmitted on Copilot', () => {
      const result = writeHookOutput('UserPromptSubmitted', { test: 'context' }, true)
      expect(result).toEqual({})
    })

    test('returns empty object for other events on Copilot', () => {
      const result = writeHookOutput('SomeOtherEvent', { test: 'context' }, true)
      expect(result).toEqual({})
    })

    test('emits full context for non-Copilot hosts', () => {
      const result = writeHookOutput('UserPromptSubmitted', { test: 'context' }, false)
      expect(result).toEqual({ additionalContext: { test: 'context' } })
    })
  })

  describe('supportsMidSessionUpdate', () => {
    test('returns false for Copilot', () => {
      expect(supportsMidSessionUpdate('copilot')).toBe(false)
    })

    test('returns true for other hosts', () => {
      expect(supportsMidSessionUpdate('claude-code')).toBe(true)
      expect(supportsMidSessionUpdate('cursor')).toBe(true)
      expect(supportsMidSessionUpdate('unknown')).toBe(true)
    })
  })

  describe('getEffectiveMode', () => {
    test('returns session mode for Copilot with pending change', () => {
      const result = getEffectiveMode('copilot', 'full', 'lite')
      expect(result.effectiveMode).toBe('lite')
      expect(result.pendingMode).toBe('full')
      expect(result.willApplyOnNextSession).toBe(true)
      expect(result.message).toContain('Takes effect on next session start')
    })

    test('returns current mode for Copilot when no pending change', () => {
      const result = getEffectiveMode('copilot', 'full', 'full')
      expect(result.effectiveMode).toBe('full')
      expect(result.pendingMode).toBeNull()
      expect(result.willApplyOnNextSession).toBe(false)
      expect(result.message).toBeNull()
    })

    test('returns current mode immediately for non-Copilot hosts', () => {
      const result = getEffectiveMode('claude-code', 'full', 'lite')
      expect(result.effectiveMode).toBe('full')
      expect(result.pendingMode).toBeNull()
      expect(result.willApplyOnNextSession).toBe(false)
      expect(result.message).toBeNull()
    })
  })

  describe('handleModeCommand', () => {
    const testConfigDir = '/tmp/ponytail-test'
    const fs = require('fs')
    const path = require('path')

    beforeEach(() => {
      if (fs.existsSync(testConfigDir)) {
        fs.rmSync(testConfigDir, { recursive: true })
      }
      fs.mkdirSync(testConfigDir, { recursive: true })
    })

    afterEach(() => {
      if (fs.existsSync(testConfigDir)) {
        fs.rmSync(testConfigDir, { recursive: true })
      }
    })

    test('returns pending message for Copilot mode change', () => {
      // Set initial mode
      fs.writeFileSync(path.join(testConfigDir, '.ponytail-active'), 'lite')
      
      const result = handleModeCommand({
        configDir: testConfigDir,
        mode: 'full',
        host: 'copilot',
        sessionMode: 'lite'
      })
      
      expect(result.mode).toBe('lite') // effective mode unchanged
      expect(result.pendingMode).toBe('full')
      expect(result.message).toContain('Takes effect on next session start')
    })

    test('applies mode immediately for non-Copilot hosts', () => {
      fs.writeFileSync(path.join(testConfigDir, '.ponytail-active'), 'lite')
      
      const result = handleModeCommand({
        configDir: testConfigDir,
        mode: 'full',
        host: 'claude-code',
        sessionMode: 'lite'
      })
      
      expect(result.mode).toBe('full')
      expect(result.pendingMode).toBeNull()
      expect(result.message).not.toContain('next session')
    })

    test('validates mode values', () => {
      const result = handleModeCommand({
        configDir: testConfigDir,
        mode: 'invalid',
        host: 'copilot'
      })
      
      expect(result.mode).toBe('off') // default
      expect(result.message).toContain('Invalid mode')
    })
  })
})
