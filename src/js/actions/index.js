import {
  INITIALIZE_DATA,
  COPY_PATTERN,
  CREATE_PATTERN,
  DELETE_PATTERN,
  DELETE_SONG,
  LOAD_PATTERN,
  PATTERN_CLEAR,
  SAVE_EDITS,
  SAVE_PATTERN,
  SET_CONFIG,
  SET_CURRENT_STEP,
  SET_EDIT_MODE,
  SET_NUMBER_OF_CHANNELS,
  SET_NUMBER_OF_STEPS,
  SET_PATTERNS,
  SET_PATTERN_NAME,
  SET_STEP,
  SET_STEP_VALUE,  
  SET_SONGS,
  SET_TIME_VALUE,
  SET_TIME_VALUE_TEMPORARY,
  START_SEQUENCER,
  STOP_SEQUENCER
} from '../constants/action-types'

export function initializeData (payload) {
  return { type: INITIALIZE_DATA, payload }
}

export function createPattern (payload) {
  return { type: CREATE_PATTERN, payload }
}

export function copyPattern (payload) {
  return { type: COPY_PATTERN, payload }
}

export function deletePattern (payload) {
  return { type: DELETE_PATTERN, payload }
}

export function deleteSong (payload) {
  return { type: DELETE_SONG, payload }
}

export function loadPattern (payload) {
  return { type: LOAD_PATTERN, payload }
}

export function patternClear (payload) {
  return { type: PATTERN_CLEAR, payload }
}

export function saveEdits (payload) {
  return { type: SAVE_EDITS, payload }
}

export function savePattern (payload) {
  return { type: SAVE_PATTERN, payload }
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

export function setSongs (payload) {
  return { type: SET_SONGS, payload }
}

export function setStepValue (payload) {
  return { type: SET_STEP_VALUE, payload }
}

export function setTimeValue (payload) {
  return { type: SET_TIME_VALUE, payload }
}

export function setTimeValueTemporary (payload) {
  return { type: SET_TIME_VALUE_TEMPORARY, payload }
}

export function startSequencer (payload) {
  return { type: START_SEQUENCER, payload }
}

export function stopSequencer (payload) {
  return { type: STOP_SEQUENCER, payload }
}