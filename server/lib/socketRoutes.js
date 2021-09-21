module.exports = function socketRoutes (socket, stateMachine) {

  require('./routes/pattern.js')(socket, stateMachine)

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
    socket.emit('config', stateMachine.getConfig())
    return
  })

  socket.on('SONG_ADD_STEP', payload => {
    console.log('song add step')
    stateMachine.songAddStep()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_COPY_STEP', payload => {
    console.log('song copy step', payload)
    stateMachine.songCopyStep(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_DELETE_STEP', payload => {
    console.log('song delete step', payload)
    stateMachine.songDeleteStep(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_SET_NAME', (payload) => {
    console.log('SONG_SET_NAME', payload)
    stateMachine.config.activeSong.name = payload.value
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_SAVE', (payload) => {
    console.log('saving song')
    stateMachine.saveSong()
    socket.emit('config', stateMachine.getConfig())
    socket.emit('songs', stateMachine.getSongs())
    stateMachine.saveToDisk()
  })

  socket.on('SONG_STEPS_CHANGE_ORDER', payload => {
    stateMachine.songChangeStepOrder(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_SET_VALUE', payload => {
    console.log('song set value', payload)
    switch(payload.type) {
      case 'pattern':
        stateMachine.config.activeSong.steps[payload.idx].id = payload.value
        break;
      case 'repeat':
        stateMachine.config.activeSong.steps[payload.idx].repeat = Number(payload.value)
        break;
      case 'speed':
        stateMachine.config.activeSong.steps[payload.idx].speed = Number(payload.value)
        break;
      default:
        break;
    }
    stateMachine.songFillSteps()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('START_SEQUENCER', payload => {
    console.log('starting sequencer', payload)
    stateMachine.start(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('STOP_SEQUENCER', payload => {
    stateMachine.stop()
    socket.emit('config', stateMachine.getConfig())
  })

}