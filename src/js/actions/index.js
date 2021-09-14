import {
  INITIALIZE_DATA,
  LOAD_PATTERN,
  SAVE_EDITS,
  SET_CONFIG,
  SET_CURRENT_STEP,
  SET_EDIT_MODE,
  SET_NUMBER_OF_CHANNELS,
  SET_NUMBER_OF_STEPS,
  SET_PATTERNS,
  SET_PATTERN_NAME,
  SET_STEP,
  SET_STEP_VALUE,  
  SET_TIME_VALUE
} from '../constants/action-types'

export function initializeData (payload) {
  return { type: INITIALIZE_DATA, payload }
}

export function loadPattern (payload) {
  return { type: LOAD_PATTERN, payload }
}

export function saveEdits (payload) {
  return { type: SAVE_EDITS, payload }
}

export function setConfig (payload) {
  return { type: SET_CONFIG, payload }
}

export function setCurrentStep (payload) {
  return { type: SET_CURRENT_STEP, payload }
}

export function setEditMode (payload) {
  return { type: SET_EDIT_MODE, payload }
}

export function setNumberOfChannels (payload) {
  return { type: SET_NUMBER_OF_CHANNELS, payload }
}

export function setNumberOfSteps (payload) {
  return { type: SET_NUMBER_OF_STEPS, payload }
}

export function setStep (payload) {
  return { type: SET_STEP, payload }
}

export function setPatterns (payload) {
  return { type: SET_PATTERNS, payload }
}

export function setPatternName (payload) {
  return {  type: SET_PATTERN_NAME, payload }
}

export function setStepValue (payload) {
  return { type: SET_STEP_VALUE, payload }
}

export function setTimeValue (payload) {
  return { type: SET_TIME_VALUE, payload }
}