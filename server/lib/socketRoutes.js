module.exports = function socketRoutes (socket, stateMachine) {

  socket.on('PATTERN_SAVE_PATTERN', (payload) => {
    console.log('saving pattern')
    let patternIndex = stateMachine.getPatternIndex(stateMachine.config.activePatternId)
    stateMachine.patterns[patternIndex] = JSON.parse(JSON.stringify(stateMachine.config.activePattern))
    console.log(stateMachine.patterns[patternIndex].name)
    socket.emit('config', stateMachine.config)
    socket.emit('patterns', stateMachine.patterns)
  })

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
    const existingIndex = stateMachine.config.activePattern.channels[0].steps.findIndex(o=>o.idx === payload.step)
    if(existingIndex === -1) {
      console.log('adding new value to steps')
      stateMachine.config.activePattern.channels[0].steps.push({ idx: payload.step, value: payload.value })
    }
    
  })

  socket.on('PATTERN_SET_VALUE_STEP', payload => {
    console.log(payload)
    const existingIndex = stateMachine.config.activePattern.channels[payload.channel].steps.findIndex(o=>o.idx === payload.step)
    if (payload.value === true) {
      if (existingIndex === -1) {
        // stateMachine.config.activePattern.channels[payload.channel].steps.push({ idx: payload.step, value: 1 })
      } else {
        // do nothing
      }
    } else {
      // slice it out
      stateMachine.config.activePattern.channels[payload.channel].steps = 
        stateMachine.config.activePattern.channels[payload.channel].steps.filter((o,idx)=>idx!==existingIndex)
    }
    socket.emit('config', stateMachine.config)
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