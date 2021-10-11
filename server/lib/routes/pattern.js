module.exports = function setupPattern (socket, stateMachine) {

  socket.on('PATTERN_SAVE', (payload) => {
    console.log('saving pattern')
    stateMachine.savePattern()
    socket.emit('config', stateMachine.config)
    socket.emit('patterns', stateMachine.getPatterns())
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
    console.log('PATTERN_SET_VALUE_TIME')
    console.log(payload)
    const existingIndex = stateMachine.config.activePattern.channels[0].steps.findIndex(o=>o.idx === payload.step)
    if(existingIndex === -1) {
      console.log('adding new value to steps')
      stateMachine.config.activePattern.channels[0].steps.push({ idx: payload.step, value: payload.value })
    } else {
      if(payload.value === 0) {
        console.log('splicing', existingIndex)
        stateMachine.config.activePattern.channels[0].steps = 
          stateMachine.config.activePattern.channels[0].steps.filter((o,i)=>i!==existingIndex)
      } else {
        stateMachine.config.activePattern.channels[0].steps[existingIndex].value = payload.value
      }      
    }
    socket.emit('config', stateMachine.config)
  })

  socket.on('PATTERN_SET_VALUE_STEP', payload => {
    const existingIndex = stateMachine.config.activePattern.channels[payload.channel].steps.findIndex(o=>o.idx === payload.step)
    console.log(payload, existingIndex)
    if (payload.value === true) {
      if (existingIndex === -1) {
        stateMachine.config.activePattern.channels[payload.channel].steps.push({ idx: payload.step, value: 1 })
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

  socket.on('PATTERN_CREATE', payload => {
    console.log('create pattern called', payload)
    switch (payload.mode) {
      case 'pattern':
        stateMachine.createPattern()
        socket.emit('patterns', stateMachine.getPatterns())
        break;
      case 'song': 
        stateMachine.createSong()
        socket.emit('songs', stateMachine.getSongs())
        break;
      case 'playlist':
        stateMachine.createPlaylist()
        socket.emit('playlists', stateMachine.getPlaylists())
        break;
      default:
        break;
    }    
    return    
  })  

  socket.on('PATTERN_DELETE', payload => {
    console.log('delete called', payload)    
    switch (payload.mode) {
      case 'pattern':
        stateMachine.deletePattern(payload.id)
        socket.emit('patterns', stateMachine.getPatterns())
        break;
      case 'song': 
        stateMachine.deleteSong(payload.id)
        socket.emit('songs', stateMachine.getSongs())
        break;
      case 'playlist':
        stateMachine.deletePlaylist(payload.id)
        socket.emit('playlists', stateMachine.getPlaylists())
        break;
      default:
        break;
    }        
  })  

}