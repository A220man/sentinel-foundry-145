/**
 * Ponytail runtime hooks for Copilot integration
 * 
 * Issue #1133: Copilot command-hook output is dropped for userPromptSubmitted events.
 * Only SessionStart hook output is preserved. Mid-session mode commands update the
 * mode file but cannot change active-session instructions through this hook path.
 */

const SUPPORTED_EVENTS = ['SessionStart', 'UserPromptSubmitted']

/**
 * Writes hook output for Copilot.
 * For Copilot, additionalContext is only emitted on SessionStart.
 * For other events (including UserPromptSubmitted), an empty object is returned
 * because Copilot drops prompt-hook output.
 * 
 * @param {string} event - The hook event type
 * @param {Object} context - The context to include
 * @param {boolean} isCopilot - Whether the target is Copilot
 * @returns {Object} The hook output
 */
function writeHookOutput(event, context, isCopilot = false) {
  if (isCopilot) {
    // Copilot only preserves additionalContext from SessionStart hook
    // UserPromptSubmitted hook output is dropped per GitHub Copilot hooks reference
    if (event === 'SessionStart') {
      return { additionalContext: context }
    }
    // For all other events, return empty object - output will be dropped
    return {}
  }
  
  // For non-Copilot hosts, return full context
  return { additionalContext: context }
}

/**
 * Checks if the current host supports mid-session instruction updates via hooks.
 * Currently only SessionStart is reliable for Copilot.
 * 
 * @param {string} host - The agent host identifier
 * @returns {boolean} True if mid-session updates are supported
 */
function supportsMidSessionUpdate(host) {
  // Copilot does not support mid-session instruction updates via prompt hooks
  if (host === 'copilot') return false
  // Other hosts may support it
  return true
}

/**
 * Gets the effective mode for the current session.
 * For Copilot, mode changes only take effect on next SessionStart.
 * 
 * @param {string} host - The agent host identifier
 * @param {string} currentMode - The current mode from mode file
 * @param {string} sessionMode - The mode active in current session (if known)
 * @returns {Object} Mode info with effective mode and whether it changed
 */
function getEffectiveMode(host, currentMode, sessionMode) {
  if (host === 'copilot') {
    // For Copilot, the active session uses the mode from SessionStart
    // Mode file changes only affect future sessions
    return {
      effectiveMode: sessionMode || currentMode,
      pendingMode: currentMode,
      willApplyOnNextSession: sessionMode !== currentMode,
      message: sessionMode !== currentMode 
        ? `Mode changed to "${currentMode}". Takes effect on next session start.` 
        : null
    }
  }
  
  // For other hosts, mode changes can apply immediately
  return {
    effectiveMode: currentMode,
    pendingMode: null,
    willApplyOnNextSession: false,
    message: null
  }
}

module.exports = {
  writeHookOutput,
  supportsMidSessionUpdate,
  getEffectiveMode,
  SUPPORTED_EVENTS
}
