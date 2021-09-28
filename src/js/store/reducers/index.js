import {
  INITIALIZE_DATA,
  CREATE_PATTERN,
  COPY_PATTERN,
  DELETE_PATTERN,
  DELETE_SONG,
  LOAD_PATTERN,
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
  SET_CONFIG,
  SET_CURRENT_STEP,
  SET_EDIT_MODE,
  SET_NUMBER_OF_STEPS,
  SET_PATTERNS,
  SET_PATTERN_NAME,
  SET_PLAYLISTS,
  SET_SONGS,
  SET_STEP,
  SET_STEP_TIME,
  SET_STEP_VALUE,
  SET_TIME_VALUE,
  SET_TIME_VALUE_TEMPORARY,
  SONG_ADD_STEP,
  SONG_CHANGE_STEP_ORDER,
  SONG_COPY_STEP,
  SONG_DELETE_STEP,
  SONG_SET_VALUE,
  START_SEQUENCER,
  STOP_SEQUENCER
} from '../../constants/action-types'

const initialState = {  
  config: {},
  currentStep: 10,
  dataLoaded: false,
  uiState: {
    editModePattern: null,
    editModeSong: null,
    nSteps: -1,
    name: '',
    nameSong: '',
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
            editModePattern: false,
            editModeSong: false,
            editModePlaylist: false,
            nSteps: action.payload.value.config.activePattern.patternLength,
            name: action.payload.value.config.activePattern.name,
            nameSong: action.payload.value.config.activeSong.name,
            confirmedTimeSteps: action.payload.value.config.activePattern.channels[0].steps.map(o=>{return { idx: o.idx }})
        }
      })    
    case CREATE_PATTERN:
      console.log('REDUCER - '+CREATE_PATTERN)
      window.socket.emit('PATTERN_CREATE', action.payload)
      return state
    case DELETE_PATTERN:
      console.log('REDUCER - ' + DELETE_PATTERN)
      window.socket.emit('PATTERN_DELETE', action.payload)
      return state
    case DELETE_SONG:
      console.log('REDUCER - ' + DELETE_SONG)
      window.socket.emit('SONG_DELETE', action.payload)
      return state
    case LOAD_PATTERN:
      console.log('REDUCER - '+LOAD_PATTERN, action.payload)
      window.socket.emit('CONFIG_LOAD_PATTERN', action.payload)
      return state
    case PATTERN_CLEAR:
      console.log('REDUCER = '+PATTERN_CLEAR)
      window.socket.emit('PATTERN_CLEAR', action.payload)
      return state
    case PLAYLIST_ADD_STEP:
      window.socket.emit('PLAYLIST_ADD_STEP', {})
      return state
    case PLAYLIST_CHANGE_STEP_ORDER:
      console.log('REDUCER - '+PLAYLIST_CHANGE_STEP_ORDER, action.payload)
      window.socket.emit('PLAYLIST_CHANGE_STEP_ORDER', action.payload)
      return state
    case PLAYLIST_COPY_STEP:
      console.log('REDUCER - '+PLAYLIST_COPY_STEP, action.payload)
      window.socket.emit('PLAYLIST_COPY_STEP', action.payload)
      return state
    case PLAYLIST_SET_VALUE:
      console.log('REDUCER - '+PLAYLIST_SET_VALUE, action.paylaod)
      window.socket.emit('PLAYLIST_SET_VALUE', action.payload)
      return state
    case SAVE_EDITS:
      console.log('REDUCER - '+SAVE_EDITS, action.payload)
      switch (action.payload.mode) {
        case 'pattern':
          window.socket.emit('PATTERN_SET_STEPS', { value: state.uiState.nSteps })
          window.socket.emit('PATTERN_SET_NAME', { value: state.uiState.name })
          break;
        case 'song':
          window.socket.emit('SONG_SET_NAME', { value: state.uiState.nameSong })
          break;
        case 'playlist':
          window.socket.emit('PLAYLIST_SET_NAME', { value: state.uiState.namePlaylist })
          break;
        default: 
          break;
      }
      return state
    case PLAYLIST_DELETE_STEP:
      console.log('REDUCER - '+PLAYLIST_DELETE_STEP, action.payload)
      window.socket.emit('PLAYLIST_DELETE_STEP', action.payload)
      return state
    case SAVE_PATTERN:
      console.log('REDUCER - '+SAVE_PATTERN, action.payload)
      console.log('emitting a save pattern')
      window.socket.emit('PATTERN_SAVE', { value: true })
      return state
    case SAVE_PLAYLIST:
      console.log('REDUCER - '+SAVE_PLAYLIST, action.payload)
      console.log('emitting a save playlist')
      window.socket.emit('PLAYLIST_SAVE', { value: true })
      return state      
    case SAVE_SONG:
      console.log('REDUCER - '+SAVE_SONG, action.payload)
      console.log('emitting a save song')
      window.socket.emit('SONG_SAVE', { value: true })
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
      state.config = Object.assign(
        {},
        action.payload.value,
        action.payload.value
        // {
        //   activeSong: Object.assign({}, action.payload.value.activeSong, { songSteps: action.payload.value.activeSong.songSteps })
        // }
      )
      console.log(action.payload.value)
      return Object.assign({}, state, { config: state.config, uiState: state.uiState })    
      // return Object.assign({}, state, { config: action.payload.value, uiState: state.uiState })    
    case COPY_PATTERN:
      window.socket.emit('PATTERN_COPY', action.payload)
      return state
    case SET_CURRENT_STEP:
      console.log('setting current step', action.payload)
      window.socket.emit('SET_CURRENT_STEP', action.payload)      
      return state  
    case SET_EDIT_MODE:
      console.log('setting edit mode')
      switch (action.payload.mode) {
        case 'pattern': 
          return Object.assign({}, state, { uiState: Object.assign({}, state.uiState, { editModePattern: action.payload.value }) })
        case 'song': 
          return Object.assign({}, state, { uiState: Object.assign({}, state.uiState, { editModeSong: action.payload.value }) })
        case 'playlist':
          return Object.assign({}, state, { uiState: Object.assign({}, state.uiState, { editModePlaylist: action.payload.value }) })
        default:
          break;
      }
      const uiState = Object.assign({}, state.uiState, { editModePattern: action.payload.value })
      return Object.assign({}, state, { uiState })
    case SET_NUMBER_OF_STEPS: 
      console.log('setting number of steps', action.payload)
      // window.socket.emit('PATTERN_SET_STEPS', action.payload)      
      state.uiState.nSteps = action.payload.value
      return Object.assign({}, state, { uiState: state.uiState })
    case SET_PATTERN_NAME:
      console.log('REDUCER - '+SET_PATTERN_NAME)
      switch (action.payload.mode) {
        case 'pattern':
          state.uiState.name = action.payload.value
          return Object.assign({}, state, { uiState: state.uiState })
        case 'song':
          state.uiState.nameSong = action.payload.value
          return Object.assign({}, state, { uiState: state.uiState })    
        case 'playlist':
          state.uiState.namePlaylist = action.payload.value
          return Object.assign({}, state, { uiState: state.uiState })    
        default:
          return state
      }
    case SET_PATTERNS:
      console.log('REDUCER - '+SET_PATTERNS, action.payload)
      state.patterns = Object.assign([], [], action.payload.value )
      console.log('patterns', state.patterns)
      return Object.assign({}, state, { patterns: state.patterns })
    case SET_PLAYLISTS:
      console.log('REDUCER - '+SET_PLAYLISTS, action.payload)
      return Object.assign({}, state, { playlists: action.payload.value })  
    case SET_SONGS:
      console.log('REDUCER - '+SET_SONGS, action.payload)
      return Object.assign({}, state, { songs: action.payload.value })
    case SET_STEP:
      console.log('REDUCER - '+SET_STEP, action.payload)
      return Object.assign({}, state, { currentStep: action.payload.value })
    case SET_STEP_TIME:
      console.log('REDUCER - '+SET_STEP_TIME, action.payload)
      return Object.assign({}, state, { currentStepTime: action.payload.value })
    case SET_STEP_VALUE: 
      console.log('REDUCER - '+SET_STEP_VALUE, action.payload)
      window.socket.emit('PATTERN_SET_VALUE_STEP', action.payload )
      return state
    case SET_TIME_VALUE_TEMPORARY:
      console.log('REDUCER - '+SET_TIME_VALUE_TEMPORARY, action.payload)
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
    case SONG_ADD_STEP:
      console.log('REDUCER - '+SONG_ADD_STEP)
      window.socket.emit('SONG_ADD_STEP', action.payload)
      return state
    case SONG_CHANGE_STEP_ORDER:
      window.socket.emit('SONG_CHANGE_STEP_ORDER', action.payload)
      return state  
    case SONG_COPY_STEP:
      window.socket.emit('SONG_COPY_STEP', action.payload)
      return state
    case SONG_DELETE_STEP:
      window.socket.emit('SONG_DELETE_STEP', action.payload)
      return state
    case SONG_SET_VALUE:
      window.socket.emit('SONG_SET_VALUE', action.payload)
      return state
    case START_SEQUENCER:
      console.log('REDUCER - '+START_SEQUENCER) 
      console.log(action.payload)
      window.socket.emit('START_SEQUENCER', action.payload)
      return state
    case STOP_SEQUENCER:
      console.log('REDUCER - '+STOP_SEQUENCER) 
      window.socket.emit('STOP_SEQUENCER', action.paylaod)
      return state
    default:      
      return state
  }
}

export default rootReducer