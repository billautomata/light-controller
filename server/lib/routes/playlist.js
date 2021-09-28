module.exports = function setupPlaylist (socket, stateMachine) {

  socket.on('PLAYLIST_ADD_STEP', payload => {
    console.log('PLAYLIST_ADD_STEP')
    stateMachine.addStepPlaylist()
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('PLAYLIST_CHANGE_STEP_ORDER', payload => {
    console.log('PLAYLIST_CHANGE_STEP_ORDER', payload)
    stateMachine.changeStepOrderPlaylist(payload)
    socket.emit('config', stateMachine.getConfig())    
  })

  socket.on('PLAYLIST_COPY_STEP', payload => {
    console.log('playlist copy step', payload)
    stateMachine.copyStepPlaylist(payload)
    socket.emit('config', stateMachine.getConfig())
  })  

  socket.on('PLAYLIST_DELETE_STEP', payload => {
    console.log('playlist delete step', payload)
    stateMachine.deleteStepPlaylist(payload)
    socket.emit('config', stateMachine.getConfig())
  })

  socket.on('PLAYLIST_SAVE', payload => {
    console.log('saving playlist')
    stateMachine.savePlaylist()
    socket.emit('config', stateMachine.getConfig())
    socket.emit('playlists', stateMachine.getPlaylists())
  })

  socket.on('PLAYLIST_SET_NAME', payload => {
    console.log('PLAYLIST_SET_NAME', payload)
    stateMachine.config.activePlaylist.name = payload.value
    socket.emit('config', stateMachine.getConfig())    
  })  

  socket.on('PLAYLIST_SET_VALUE', payload => {
    console.log('PLAYLIST_SET_VALUE', payload)
    stateMachine.setStepValuePlaylist(payload)
    socket.emit('config', stateMachine.getConfig())    
  })

}