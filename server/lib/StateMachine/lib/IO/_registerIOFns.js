const { loadFromDisk, saveToDisk } = require('./FileIO.js')
const { setupPins, writePins } = require('./GPIO.js')
const { registerSocket, sendMessage } = require('./Sockets.js')

module.exports = function registerIOFns (s) {
  s.loadFromDisk = loadFromDisk.bind(s)
  s.registerSocket = registerSocket.bind(s)  
  s.saveToDisk = saveToDisk.bind(s)
  s.sendMessage = sendMessage.bind(s)
  s.writePins = writePins.bind(s)
  s.setupPins = setupPins.bind(s)  
}