module.exports = { registerSocket, sendMessage }

function registerSocket (socket) {
  this.sockets.push(socket)
}

function sendMessage (type, message) {
  Object.values(this.sockets).forEach(socket=>{
    if(socket === null) {
      return
    }
    socket.emit(type, message)
  })  
}