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
    socket.emit('config', stateMachine.config)
    return
  })

  socket.on('SONG_DELETE_STEP', payload => {
    console.log('song delete step', payload)
    stateMachine.songDeleteStep(payload)
    socket.emit('config', stateMachine.config)
  })

  socket.on('SONG_COPY_STEP', payload => {
    console.log('song copy step', payload)
    stateMachine.songCopyStep(payload)
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

  socket.on('SONG_STEPS_CHANGE_ORDER', payload => {
    stateMachine.songChangeStepOrder(payload)
    socket.emit('config', stateMachine.config)
  })

  socket.on('START_SEQUENCER', payload => {
    console.log('starting sequencer', payload)
    stateMachine.start(payload)
    socket.emit('config', stateMachine.config)
  })

  socket.on('STOP_SEQUENCER', payload => {
    stateMachine.stop()
    socket.emit('config', stateMachine.config)
  })

}