const zmq = require('zeromq')
const sock = zmq.socket('push')

function emitZMQ (topic, message) {
  console.log('emitZMQ', topic, message)
  sock.send([ topic, JSON.stringify(message) ])
}

function initZMQ () {
  sock.bindSync(`tcp://${process.env.PRIMARY_IP}:31337`)
  setInterval(()=>{
    pulse()
  }, 500)
}

function pulse () {
  sock.send([ 'mappings', JSON.stringify(this.config.networkDevices) ])
}

function writeZMQ (array) {
  sock.send([ 'pins', JSON.stringify(array) ])
}

module.exports = { emitZMQ, initZMQ, pulse, writeZMQ }