module.exports = function setupPlaylist (socket, stateMachine) {

  socket.on('PLAYLIST_ADD_STEP', payload => {
    console.log('playlist add step')
    stateMachine.playlistAddStep()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('PLAYLIST_CHANGE_STEP_ORDER', payload => {
    console.log('PLAYLIST_CHANGE_STEP_ORDER', payload)
    stateMachine.playlistChangeStepOrder(payload)
    socket.emit('config', stateMachine.getConfig())    
  })

  socket.on('PLAYLIST_COPY_STEP', payload => {
    console.log('playlist copy step', payload)
    stateMachine.playlistCopyStep(payload)
    socket.emit('config', stateMachine.getConfig())
  })  

  socket.on('PLAYLIST_DELETE_STEP', payload => {
    console.log('playlist delete step', payload)
    stateMachine.playlistDeleteStep(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('PLAYLIST_SAVE', payload => {
    console.log('saving playlist')
    stateMachine.savePlaylist()
    socket.emit('config', stateMachine.getConfig())
    socket.emit('playlists', stateMachine.getPlaylists())
    stateMachine.saveToDisk()    
  })

  socket.on('PLAYLIST_SET_NAME', payload => {
    console.log('PLAYLIST_SET_NAME', payload)
    stateMachine.config.activePlaylist.name = payload.value
    socket.emit('config', stateMachine.getConfig())    
  })  

  socket.on('PLAYLIST_SET_VALUE', payload => {
    console.log('PLAYLIST_SET_VALUE', payload)
    switch(payload.type) {
      case 'song':
        stateMachine.config.activePlaylist.steps[payload.idx].id = payload.value
        break;
      case 'repeat':
        stateMachine.config.activePlaylist.steps[payload.idx].repeat = Number(payload.value)
        break;
      case 'speed':
        stateMachine.config.activactivePlaylisteSong.steps[payload.idx].speed = Number(payload.value)
        break;
      default:
        break;
    }    
    socket.emit('config', stateMachine.getConfig())    
  })

}