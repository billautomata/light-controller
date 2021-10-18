const zmq = require('zeromq')
const sock = zmq.socket('push')

function initZMQ () {
  sock.bindSync(`tcp://${process.env.PRIMARY_IP}:31337`)
  setInterval(()=>{
    pulse()
  }, 500)
}

function writeZMQ (array) {
  sock.send([ 'pins', JSON.stringify(array) ])
}

function pulse () {
  sock.send([ 'mappings', JSON.stringify(this.config.networkDevices)])
}

module.exports = { initZMQ, pulse, writeZMQ }