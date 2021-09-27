module.exports = { onConnect, registerSockets, sendMessage }

function onConnect (socketId) {
  this.sockets[socketId].emit('state-machine', {
    config: this.config,
    patterns: this.patterns,
    playlists: this.playlists,
    songs: this.songs
  })
}

function registerSockets (sockets) {
  this.sockets = sockets  
}

function sendMessage (type, message) {
  Object.values(this.sockets).forEach(socket=>{
    if(socket === null) {
      return
    }
    socket.emit(type, message)
  })  
}