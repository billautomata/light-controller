module.exports = function socketRoutes (socket, stateMachine) {

  require('./routes/pattern.js')(socket, stateMachine)
  require('./routes/playlist.js')(socket, stateMachine)
  require('./routes/song.js')(socket, stateMachine)

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
        stateMachine.loadPlaylist(payload.id)
        break;
      default:
        break;
    }
    socket.emit('config', stateMachine.getConfig())
    return
  })

  socket.on('START_SEQUENCER', payload => {
    console.log('starting sequencer', payload)
    stateMachine.startSequencer(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('STOP_SEQUENCER', payload => {
    stateMachine.stopSequencer()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('SAVE_TO_DISK', payload => {
    console.log('saving to disk')
    stateMachine.saveToDisk()
  })

  socket.on('SET_NETWORK_DEVICE_PORT_MAPPING', payload => {
    console.log('changing device port mapping', payload)
    stateMachine.updateNetworkDevice(payload)
    socket.emit('config', stateMachine.getConfig())    
  })

  socket.on('LOAD_FROM_DISK', payload => {
    console.log('loading from disk')
    stateMachine.loadFromDisk()
  })

}

