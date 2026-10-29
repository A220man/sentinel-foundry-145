// Test for Windows path handling in band register.tsx
// Issue #1191: Band on Windows: project name keeps the full path

const base = (path) => path.replace(/[\\/]+$/, '').split(/[\\/]/).pop() ?? path

describe('Windows path handling', () => {
  test('extracts project name from Windows path with backslashes', () => {
    expect(base('C:\\work\\my-app')).toBe('my-app')
    expect(base('C:\\work\\my-app\\')).toBe('my-app')
    expect(base('C:\\Users\\name\\project')).toBe('project')
  })

  test('extracts project name from Unix path with forward slashes', () => {
    expect(base('/home/user/project')).toBe('project')
    expect(base('/home/user/project/')).toBe('project')
    expect(base('/workspace/my-app')).toBe('my-app')
  })

  test('handles mixed separators', () => {
    expect(base('C:\\work/my-app')).toBe('my-app')
    expect(base('/home/user\\project')).toBe('project')
  })

  test('handles edge cases', () => {
    expect(base('simple')).toBe('simple')
    expect(base('')).toBe('')
    expect(base('C:')).toBe('C:')
    expect(base('C:\\')).toBe('C:')
  })
})
