module.exports = function socketRoutes (socket, stateMachine) {

  socket.on('PATTERN_SET_STEPS', (payload) => {
    console.log('PATTERN_SET_STEPS', payload)
    stateMachine.config.activePattern.patternLength = Number(payload.value)
    socket.emit('config', stateMachine.config)
  })

  socket.on('PATTERN_SET_NAME', (payload) => {
    console.log('PATTERN_SET_NAME', payload)
    stateMachine.config.activePattern.name = payload.value
    socket.emit('config', stateMachine.config)
  })

  socket.on('PATTERN_SET_VALUE_TIME', payload => {
    console.log(payload)
    // stateMachine.config.activePattern.channels[0].steps
  })

  socket.on('PATTERN_SET_VALUE_STEP', payload => {
    console.log(payload)
    // stateMachine.config.activePattern.channels[0].steps
  })
  
  socket.on('PATTERN_SET_VALUE_ACTIVESTEP_INDEX', payload => {
    console.log(payload)
    // stateMachine.config.activePattern.channels[0].steps
  })  

  socket.on('CONFIG_LOAD_PATTERN', payload => {
    console.log('payload', payload)
    const matchingPattern = stateMachine.patterns.filter(o=>o.id === payload.id)    
    console.log('matching pattern')
    console.log(matchingPattern)
    if(matchingPattern !== undefined) {
      console.log('changing the state ')
      stateMachine.loadPattern(payload.id)
    }
    socket.emit('config', stateMachine.config)
  })

}