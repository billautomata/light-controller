import {
  SET_CURRENT_STEP,
  SET_NUMBER_OF_CHANNELS,
  SET_PATTERNS,
  SET_STEP,
  SET_STEP_VALUE,
  SET_TIME_VALUE,
} from '../../constants/action-types'

const initialState = {  
  currentPattern: 0,
  currentStep: 0,
  dataLoaded: false,
  patterns: [
    { 
      name: 'dummy pattern', 
      patternLength: 1,      
      channels: [
        { name: 'dummy pattern', steps: [{value: -1}]}
      ]
    }
  ]
}

function rootReducer(state = initialState, action) {
  // console.log('action', action)
  switch(action.type) {
    case SET_CURRENT_STEP:
      console.log('setting current step', action.payload)
      window.socket.emit('SET_CURRENT_STEP', action.payload)      
      return state  
    case SET_NUMBER_OF_CHANNELS: 
      console.log('setting number of channels', action.payload)
      window.socket.emit('SET_NUMBER_OF_CHANNELS', action.payload)
      return state
    case SET_PATTERNS:
      return Object.assign({}, state, { patterns: action.payload.value, dataLoaded: true })
    case SET_STEP:
      return Object.assign({}, state, { currentStep: action.payload.value })
    case SET_STEP_VALUE: 
      window.socket.emit('PATTERN_VALUE', action.payload )
      return state
    case SET_TIME_VALUE:
      console.log('setting time value', action.payload)
      window.socket.emit('SET_TIME_VALUE', action.payload)      
      return state
    default:      
      return state
  }
}

export default rootReducer