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
  SET_TIME_VALUE,
} from '../../constants/action-types'

const initialState = {  
  config: {},
  dataLoaded: false,
  uiState: {
    editMode: true,
    nSteps: -1,
    name: ''
  },
  patterns: [],
  songs: [],
  playlists: []
}

function rootReducer(state = initialState, action) {
  // console.log('action', action)
  switch(action.type) {
    case INITIALIZE_DATA: 
      console.log('initialize data', action.payload)
      return Object.assign({}, state, 
        { 
          config: action.payload.value.config,
          patterns: action.payload.value.patterns,
          songs: action.payload.value.songs,
          playlists: action.payload.value.playlists,
          dataLoaded: true,
          uiState: {
            editMode: true,
            nSteps: action.payload.value.config.activePattern.patternLength,
            name: action.payload.value.config.activePattern.name
          }
        })
    case LOAD_PATTERN:
      console.log('loading pattern', action.payload)
      window.socket.emit('CONFIG_LOAD_PATTERN', action.payload)
      return state
    case SAVE_EDITS:
        window.socket.emit('PATTERN_SET_STEPS', { value: state.uiState.nSteps })
        window.socket.emit('PATTERN_SET_NAME', { value: state.uiState.name })
        state.uiState.editMode = false
        return Object.assign({}, state, { uiState: state.uiState })
    case SET_CONFIG: 
      console.log('setting config in state', action.payload)
      state.uiState = Object.assign({}, state.uiState, 
        { 
          name: action.payload.value.activePattern.name ,
          nSteps: action.payload.value.activePattern.patternLength
        })
      // state.uiState.name = action.payload.value.activePattern.name
      // state.uiState.nSteps = action.payload.value.activePattern.patternLength
      return Object.assign({}, state, { config: action.payload.value, uiState: state.uiState })
    // case SET_CURRENT_STEP:
    //   console.log('setting current step', action.payload)
    //   window.socket.emit('SET_CURRENT_STEP', action.payload)      
    //   return state  
    case SET_EDIT_MODE:
      console.log('setting edit mode')
      return Object.assign({}, state, { editMode: action.payload.value })
    case SET_NUMBER_OF_STEPS: 
      console.log('setting number of steps', action.payload)
      // window.socket.emit('PATTERN_SET_STEPS', action.payload)      
      state.uiState.nSteps = action.payload.value
      return Object.assign({}, state, { uiState: state.uiState })
    case SET_PATTERN_NAME:
      console.log('setting pattern name')
      state.uiState.name = action.payload.value
      return Object.assign({}, state, { uiState: state.uiState })
    // case SET_PATTERNS:
    //   return Object.assign({}, state, { patterns: action.payload.value, dataLoaded: true })
    // case SET_STEP:
    //   return Object.assign({}, state, { currentStep: action.payload.value })
    // case SET_STEP_VALUE: 
    //   window.socket.emit('PATTERN_VALUE', action.payload )
    //   return state
    // case SET_TIME_VALUE:
    //   console.log('setting time value', action.payload)
    //   window.socket.emit('SET_TIME_VALUE', action.payload)      
    //   return state
    default:      
      return state
  }
}

export default rootReducer