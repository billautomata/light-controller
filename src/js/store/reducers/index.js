import {
  INITIALIZE_DATA,
  CREATE_PATTERN,
  COPY_PATTERN,
  DELETE_PATTERN,
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
  SET_TIME_VALUE,
  SET_TIME_VALUE_TEMPORARY,
  START_SEQUENCER,
  STOP_SEQUENCER
} from '../../constants/action-types'

const initialState = {  
  config: {},
  currentStep: 10,
  dataLoaded: false,
  uiState: {
    editMode: true,
    nSteps: -1,
    name: '',
    confirmedTimeSteps: []
  },
  patterns: [],
  songs: [],
  playlists: []
}

function rootReducer(state = initialState, action) {
  // console.log('action', action)
  switch(action.type) {
    case INITIALIZE_DATA: 
      console.log('REDUCER - '+INITIALIZE_DATA, action.payload)
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
            name: action.payload.value.config.activePattern.name,
            confirmedTimeSteps: action.payload.value.config.activePattern.channels[0].steps.map(o=>{return { idx: o.idx }})
          }
        })
    
    case CREATE_PATTERN:
      console.log('REDUCER - '+CREATE_PATTERN)
      window.socket.emit('PATTERN_CREATE', action.payload)
      return state
    case DELETE_PATTERN:
      console.log('REDUCER -'+DELETE_PATTERN)
      window.socket.emit('PATTERN_DELETE', action.payload)
      return state
    case LOAD_PATTERN:
      console.log('REDUCER - '+LOAD_PATTERN, action.payload)
      window.socket.emit('CONFIG_LOAD_PATTERN', action.payload)
      return state
    case PATTERN_CLEAR:
      console.log('REDUCER = '+PATTERN_CLEAR)
      window.socket.emit('PATTERN_CLEAR', action.payload)
      return state
    case SAVE_EDITS:
      console.log('REDUCER - '+SAVE_EDITS, action.payload)
      window.socket.emit('PATTERN_SET_STEPS', { value: state.uiState.nSteps })
      window.socket.emit('PATTERN_SET_NAME', { value: state.uiState.name })
      state.uiState.editMode = false
      return Object.assign({}, state, { uiState: state.uiState })
    case SAVE_PATTERN:
      console.log('REDUCER - '+SAVE_PATTERN, action.payload)
      console.log('emitting a save pattern')
      window.socket.emit('PATTERN_SAVE_PATTERN', { value: true })
      return state
    case SET_CONFIG: 
      console.log('setting config in state', action.payload)
      state.uiState = Object.assign(
        {}, 
        state.uiState, 
        { 
          name: action.payload.value.activePattern.name ,
          nSteps: action.payload.value.activePattern.patternLength,
          confirmedTimeSteps: action.payload.value.activePattern.channels[0].steps.map(o=>{ return { idx: o.idx }})
        }
      )
      return Object.assign({}, state, { config: action.payload.value, uiState: state.uiState })    
    case COPY_PATTERN:
      window.socket.emit('PATTERN_COPY', action.payload)
      return state
    case SET_CURRENT_STEP:
      console.log('setting current step', action.payload)
      window.socket.emit('SET_CURRENT_STEP', action.payload)      
      return state  
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
    case SET_PATTERNS:
      console.log('REDUCER - '+SET_PATTERNS, action.payload)
      state.patterns = Object.assign([], [], action.payload.value )
      console.log('patterns', state.patterns)
      return Object.assign({}, state, { patterns: state.patterns })
    case SET_STEP:
      console.log('REDUCER - '+SET_STEP, action.payload)
      return Object.assign({}, state, { currentStep: action.payload.value.value })
    case SET_STEP_VALUE: 
      console.log('REDUCER - '+SET_STEP_VALUE, action.payload)
      window.socket.emit('PATTERN_SET_VALUE_STEP', action.payload )
      return state
    case SET_TIME_VALUE_TEMPORARY:
      // remove the payload from the confirmedTimeSteps
      state.uiState.confirmedTimeSteps = state.uiState.confirmedTimeSteps.filter(o=>o.idx !== action.payload.step)
      state.uiState = Object.assign({}, state.uiState, { uiState: state.uiState })      
      return Object.assign({}, state, state)
    case SET_TIME_VALUE:
      if (action.payload.value === 0) {
        state.uiState.confirmedTimeSteps = state.uiState.confirmedTimeSteps.filter(o=>o.idx !== action.payload.step)  
      } else {
        state.uiState.confirmedTimeSteps.push({idx: action.payload.step})
      }
      state.uiState = Object.assign({}, state.uiState, { uiState: state.uiState })      
      console.log('setting time value', action.payload)
      window.socket.emit('PATTERN_SET_VALUE_TIME', action.payload)      
      return Object.assign({}, state, state)
    case START_SEQUENCER:
      console.log('REDUCER - '+START_SEQUENCER) 
      window.socket.emit('START_SEQUENCER', action.paylaod)
      return state
    case STOP_SEQUENCER:
      console.log('REDUCER - '+START_SEQUENCER) 
      window.socket.emit('STOP_SEQUENCER', action.paylaod)
      return state
    default:      
      return state
  }
}

export default rootReducer