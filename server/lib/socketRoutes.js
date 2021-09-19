module.exports = function socketRoutes (socket, stateMachine) {

  socket.on('PATTERN_SAVE', (payload) => {
    console.log('saving pattern')
    let patternIndex = stateMachine.getPatternIndex(stateMachine.config.activePatternId)
    stateMachine.getPatterns()[patternIndex] = JSON.parse(JSON.stringify(stateMachine.config.activePattern))
    console.log(stateMachine.patterns[patternIndex].name)
    socket.emit('config', stateMachine.config)
    socket.emit('patterns', stateMachine.getPatterns())
    stateMachine.saveToDisk()
  })

  socket.on('PATTERN_CLEAR', (payload) => {
    stateMachine.config.activePattern.channels.forEach(channel=>{
      channel.steps = []
    })
    stateMachine.config.activePattern.channels[0].steps.push({idx: 0, value: 500})
    socket.emit('config', stateMachine.config)
  })
 
  socket.on('PATTERN_COPY', payload => {
    console.log('PATTERN_COPY', payload)
    
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

  socket.on('SONG_SET_NAME', (payload) => {
    console.log('SONG_SET_NAME', payload)
    stateMachine.config.activeSong.name = payload.value
    socket.emit('config', stateMachine.config)
  })

  socket.on('SONG_SAVE', (payload) => {
    console.log('saving song')
    stateMachine.saveSong()
    socket.emit('config', stateMachine.config)
    socket.emit('songs', stateMachine.getSongs())
    stateMachine.saveToDisk()
  })


  socket.on('PATTERN_SET_VALUE_TIME', payload => {
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

  socket.on('CONFIG_LOAD_PATTERN', payload => {
    console.log('payload', payload)
    switch (payload.mode) {
      case 'pattern':
        stateMachine.loadPattern(payload.id)
        break;
      case 'song': 
        stateMachine.loadSong(payload.id)
        break;
      case 'playlist':
        break;
      default:
        break;
    }
    socket.emit('config', stateMachine.config)
    return
    const matchingPattern = stateMachine.patterns.filter(o=>o.id === payload.id)    
    console.log('matching pattern')
    console.log(matchingPattern)
    if(matchingPattern !== undefined) {
      console.log('changing the state ')
      stateMachine.loadPattern(payload.id)
    }
    socket.emit('config', stateMachine.config)
  })

  socket.on('START_SEQUENCER', payload => {
    stateMachine.start()
    socket.emit('config', stateMachine.config)
  })

  socket.on('STOP_SEQUENCER', payload => {
    stateMachine.stop()
    socket.emit('config', stateMachine.config)
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
        // stateMachine.createPlaylist()
        socket.emit('playlists', stateMachine.getPlaylists())
        break;
      default:
        break;
    }        
  })
}