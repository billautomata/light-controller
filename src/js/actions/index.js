import {
  COPY_PATTERN,
  CREATE_PATTERN,
  DELETE_PATTERN,
  DELETE_SONG,
  INITIALIZE_DATA,
  LOAD_PATTERN,
  MAP_PIN_TO_CHANNEL,
  PATTERN_CLEAR,
  PLAYLIST_ADD_STEP,
  PLAYLIST_CHANGE_STEP_ORDER,
  PLAYLIST_COPY_STEP,
  PLAYLIST_DELETE_STEP,
  PLAYLIST_SET_VALUE,
  SAVE_EDITS,
  SAVE_PATTERN,
  SAVE_PLAYLIST,
  SAVE_SONG,
  SET_BOOT_PLAYLIST,
  SET_CONFIG,
  SET_CURRENT_STEP,
  SET_EDIT_MODE,
  SET_NETWORK_DEVICE_PORT_MAPPING,
  SET_NETWORK_DEVICE_STATS,
  SET_NUMBER_OF_STEPS,
  SET_PATTERNS,
  SET_PATTERN_NAME,
  SET_PLAYLISTS,
  SET_START_ON_BOOT,
  SET_STEP,
  SET_STEP_TIME,
  SET_STEP_VALUE,  
  SET_SONGS,
  SET_TIME_VALUE,
  SET_TIME_VALUE_TEMPORARY,
  SONG_ADD_STEP,  
  SONG_CHANGE_STEP_ORDER,
  SONG_COPY_STEP,
  SONG_DELETE_STEP,
  SONG_SET_VALUE,
  START_SEQUENCER,
  STOP_SEQUENCER,
  TEST_NETWORK_DEVICE
} from '../constants/action-types'

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

export function initializeData (payload) {
  return { type: INITIALIZE_DATA, payload }
}

export function loadPattern (payload) {
  return { type: LOAD_PATTERN, payload }
}

export function mapPinToChannel (payload) {
  return { type: MAP_PIN_TO_CHANNEL, payload }
}

export function patternClear (payload) {
  return { type: PATTERN_CLEAR, payload }
}

export function playlistAddStep (payload) {
  return { type: PLAYLIST_ADD_STEP, payload }
}

export function playlistChangeStepOrder (payload) {
  return { type: PLAYLIST_CHANGE_STEP_ORDER, payload }
}

export function playlistCopyStep (payload) {
  return { type: PLAYLIST_COPY_STEP, payload }
}

export function playlistDeleteStep (payload) {
  return { type: PLAYLIST_DELETE_STEP, payload }
}

export function playlistSetValue(payload) {
  return { type: PLAYLIST_SET_VALUE, payload }
}

export function saveEdits (payload) {
  return { type: SAVE_EDITS, payload }
}

export function savePattern (payload) {
  return { type: SAVE_PATTERN, payload }
}

export function savePlaylist (payload) {
  return { type: SAVE_PLAYLIST, payload }
}

export function saveSong (payload) {
  return { type: SAVE_SONG, payload }
}

export function setBootPlaylist (payload) {
  return { type: SET_BOOT_PLAYLIST, payload }
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

export function setNetworkDevicePortMapping (payload) {
  return { type: SET_NETWORK_DEVICE_PORT_MAPPING, payload }
}

export function setNetworkDeviceStats (payload) {
  return { type: SET_NETWORK_DEVICE_STATS, payload }
}

export function setNumberOfSteps (payload) {
  return { type: SET_NUMBER_OF_STEPS, payload }
}

export function setStep (payload) {
  return { type: SET_STEP, payload }
}

export function setStepTime (payload) {
  return { type: SET_STEP_TIME, payload }
}

export function setPatterns (payload) {
  return { type: SET_PATTERNS, payload }
}

export function setPatternName (payload) {
  return {  type: SET_PATTERN_NAME, payload }
}

export function setPlaylists (payload) {
  return { type: SET_PLAYLISTS, payload }
}

export function setStartOnBoot (payload) {
  return { type: SET_START_ON_BOOT, payload }
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

export function songAddStep (payload) {
  return { type: SONG_ADD_STEP, payload }
}

export function songChangeStepOrder (payload) {
  return { type: SONG_CHANGE_STEP_ORDER, payload }
}

export function songCopyStep (payload) {
  return { type: SONG_COPY_STEP, payload }
}

export function songDeleteStep (payload) {
  return { type: SONG_DELETE_STEP, payload }
}

export function songSetValue (payload) {
  return { type: SONG_SET_VALUE, payload }
}

export function startSequencer (payload) {
  return { type: START_SEQUENCER, payload }
}

export function stopSequencer (payload) {
  return { type: STOP_SEQUENCER, payload }
}

export function testNetworkDevice (payload) {
  return { type: TEST_NETWORK_DEVICE, payload }
}