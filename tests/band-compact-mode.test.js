// Test for compact mode layout in band register.tsx
// Issue #1183: Band compact mode spreads over several lines in desktop app

// This test verifies that the compact mode JSX structure doesn't contain
// a spacer Box with flexGrow that causes wrapping in desktop app

const fs = require('fs')
const path = require('path')

describe('Compact mode layout', () => {
  const registerPath = path.join(__dirname, '../hooks/band/register.tsx')
  const content = fs.readFileSync(registerPath, 'utf-8')

  test('compact mode does not contain flexGrow spacer', () => {
    // The old code had: <Box flexGrow={1} /> between metrics and buttons
    // This caused wrapping in desktop app
    const compactModeSection = content.match(/if \(!b\.details\) \{[\s\S]*?^\s+\}\)/m)
    expect(compactModeSection).toBeTruthy()
    
    const section = compactModeSection[0]
    // Should not have the problematic spacer
    expect(section).not.toContain('<Box flexGrow={1} />')
    expect(section).not.toContain('flexGrow={1}')
  })

  test('compact mode uses justifyContent space-between', () => {
    const compactModeSection = content.match(/if \(!b\.details\) \{[\s\S]*?^\s+\}\)/m)
    expect(compactModeSection).toBeTruthy()
    
    const section = compactModeSection[0]
    // Should use justifyContent="space-between" on the outer container
    expect(section).toContain('justifyContent="space-between"')
  })

  test('compact mode has left and right button groups', () => {
    const compactModeSection = content.match(/if \(!b\.details\) \{[\s\S]*?^\s+\}\)/m)
    expect(compactModeSection).toBeTruthy()
    
    const section = compactModeSection[0]
    // Left group: level, cost, time, reuse, warnings
    expect(section).toContain('key="level"')
    expect(section).toContain('spent.toFixed(2)')
    expect(section).toContain('elapsed(b.busyMs)')
    
    // Right group: Review, Audit, Board, Details buttons
    expect(section).toContain('key="review"')
    expect(section).toContain('key="audit"')
    expect(section).toContain('key="board"')
    expect(section).toContain('key="details"')
  })
})
