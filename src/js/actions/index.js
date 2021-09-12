import {
  SET_CURRENT_STEP,
  SET_NUMBER_OF_CHANNELS,
  SET_NUMBER_OF_STEPS,
  SET_PATTERNS,
  SET_STEP,
  SET_STEP_VALUE,  
  SET_TIME_VALUE
} from '../constants/action-types'

export function setCurrentStep (payload) {
  return { type: SET_CURRENT_STEP, payload }
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

export function setStepValue (payload) {
  return { type: SET_STEP_VALUE, payload }
}

export function setTimeValue (payload) {
  return { type: SET_TIME_VALUE, payload }
}