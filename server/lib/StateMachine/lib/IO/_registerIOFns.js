const { loadFromDisk, saveToDisk } = require('./FileIO.js')
const { setupPins, writePins } = require('./GPIO.js')
const { onConnect, registerSockets, sendMessage } = require('./Sockets.js')
const { emitZMQ, initZMQ, writeZMQ }  = require('./ZMQ.js')

module.exports = function registerIOFns (s) {
  s.loadFromDisk = loadFromDisk.bind(s)
  s.onConnect = onConnect.bind(s)
  s.registerSockets = registerSockets.bind(s)  
  s.saveToDisk = saveToDisk.bind(s)
  s.sendMessage = sendMessage.bind(s)
  s.writePins = writePins.bind(s)
  s.setupPins = setupPins.bind(s)
  s.emitZMQ = emitZMQ.bind(s)
  s.initZMQ = initZMQ.bind(s)
  s.writeZMQ = writeZMQ.bind(s)
}