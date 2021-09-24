module.exports = function setupSong (socket, stateMachine) {
  
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

  socket.on('SONG_CHANGE_STEP_ORDER', payload => {
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

}