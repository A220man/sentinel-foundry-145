/**
 * Ponytail mode tracker - manages the active mode state
 * 
 * Issue #1133: For Copilot, mode file changes don't update active session instructions.
 * This module tracks mode state and provides appropriate messaging.
 */

const fs = require('fs')
const path = require('path')
const { getEffectiveMode } = require('./ponytail-runtime')

const MODE_FILE = '.ponytail-active'
const DEFAULT_MODE = 'off'
const VALID_MODES = ['off', 'lite', 'full', 'ultra']

/**
 * Reads the current mode from the mode file.
 * @param {string} configDir - Configuration directory
 * @returns {string} The current mode
 */
function readMode(configDir) {
  const modePath = path.join(configDir, MODE_FILE)
  try {
    const mode = fs.readFileSync(modePath, 'utf-8').trim()
    return VALID_MODES.includes(mode) ? mode : DEFAULT_MODE
  } catch {
    return DEFAULT_MODE
  }
}

/**
 * Writes the mode to the mode file.
 * @param {string} configDir - Configuration directory
 * @param {string} mode - The mode to write
 */
function writeMode(configDir, mode) {
  if (!VALID_MODES.includes(mode)) {
    throw new Error(`Invalid mode: ${mode}. Valid modes: ${VALID_MODES.join(', ')}`)
  }
  const modePath = path.join(configDir, MODE_FILE)
  fs.writeFileSync(modePath, mode, 'utf-8')
}

/**
 * Handles a mode command and returns appropriate response.
 * For Copilot, includes messaging about when changes take effect.
 * 
 * @param {Object} params - Command parameters
 * @param {string} params.configDir - Configuration directory
 * @param {string} params.mode - Requested mode (or null to query)
 * @param {string} params.host - Agent host identifier
 * @param {string} params.sessionMode - Mode active in current session
 * @returns {Object} Result with mode info and message
 */
function handleModeCommand({ configDir, mode, host = 'unknown', sessionMode }) {
  const currentMode = readMode(configDir)
  
  if (mode === null || mode === undefined) {
    // Query current mode
    const effective = getEffectiveMode(host, currentMode, sessionMode)
    return {
      mode: effective.effectiveMode,
      message: effective.message || `Current mode: ${effective.effectiveMode}`
    }
  }
  
  if (!VALID_MODES.includes(mode)) {
    return {
      mode: currentMode,
      message: `Invalid mode: ${mode}. Valid modes: ${VALID_MODES.join(', ')}`
    }
  }
  
  if (mode === currentMode) {
    const effective = getEffectiveMode(host, currentMode, sessionMode)
    return {
      mode: effective.effectiveMode,
      message: `Already in ${mode} mode${effective.message ? `. ${effective.message}` : ''}`
    }
  }
  
  // Write new mode
  writeMode(configDir, mode)
  
  const effective = getEffectiveMode(host, mode, sessionMode)
  
  return {
    mode: effective.effectiveMode,
    pendingMode: effective.pendingMode,
    message: effective.message || `Switched to ${mode} mode`
  }
}

/**
 * Gets the default mode from config.
 * @param {string} configDir - Configuration directory
 * @returns {string} The default mode
 */
function getDefaultMode(configDir) {
  const defaultPath = path.join(configDir, '.ponytail-default')
  try {
    const mode = fs.readFileSync(defaultPath, 'utf-8').trim()
    return VALID_MODES.includes(mode) ? mode : DEFAULT_MODE
  } catch {
    return DEFAULT_MODE
  }
}

/**
 * Sets the default mode in config.
 * @param {string} configDir - Configuration directory
 * @param {string} mode - The default mode
 */
function setDefaultMode(configDir, mode) {
  if (!VALID_MODES.includes(mode)) {
    throw new Error(`Invalid mode: ${mode}. Valid modes: ${VALID_MODES.join(', ')}`)
  }
  const defaultPath = path.join(configDir, '.ponytail-default')
  fs.writeFileSync(defaultPath, mode, 'utf-8')
}

module.exports = {
  readMode,
  writeMode,
  handleModeCommand,
  getDefaultMode,
  setDefaultMode,
  VALID_MODES,
  DEFAULT_MODE
}
