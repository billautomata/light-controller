module.exports = { initZMQ, pulse, writeZMQ }

// producer.js
const zmq = require('zeromq')
const sock = zmq.socket('push')

function initZMQ () {
  sock.bindSync('tcp://192.168.0.100:31337')

  setInterval(()=>{
    pulse()
  }, 500)

}

function writeZMQ (array) {
  // console.log('array', array)
  // console.log(this.config.networkDevices)
  sock.send([ 'pins', JSON.stringify(array) ])
}

function pulse () {
  sock.send([ 'mappings', JSON.stringify(this.config.networkDevices)])
}