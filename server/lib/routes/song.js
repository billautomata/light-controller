module.exports = function setupSong (socket, stateMachine) {
  
  socket.on('SONG_ADD_STEP', payload => {
    console.log('song add step')
    stateMachine.addStepSong()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_COPY_STEP', payload => {
    console.log('song copy step', payload)
    stateMachine.copyStepSong(payload)
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
    stateMachine.changeStepOrderSong(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SONG_SET_VALUE', payload => {
    console.log('song set value', payload)
    stateMachine.setStepValueSong(payload)
    socket.emit('config', stateMachine.getConfig())
  })

}