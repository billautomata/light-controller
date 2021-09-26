module.exports = { registerSocket, sendMessage }

function registerSocket (socket) {
  this.sockets.push(socket)
}

function sendMessage (destination, message) {
  Object.values(this.sockets).forEach(socket=>{
    if(socket === null) {
      return
    }
    socket.emit(destination, message)
  })  
}