require('dotenv').config()
const gpio = require('rpio')
const http = require('http')
const _ = require('underscore')
const zmq = require('zeromq')

let channelMapping = [-1,-1,-1,-1]

let pins = [12,16,18,22]
pins.forEach((pin,pinIdx)=>{
  console.log('setting up pin: ' + pinIdx + ' ' + pin)
  gpio.open(pin, gpio.OUTPUT)
})

const MAC_ADDRESS = require('./lib/network-identification').getMACAddress()
console.log(`I am a worker, my MAC Address is: ${MAC_ADDRESS}`)

let heartbeatLastTime = Date.now()
const reconnectLimit = 5000
let keepAliveInterval = setInterval(()=>{
  if ((Date.now() - heartbeatLastTime) > reconnectLimit) {
    console.log('heartbeat time limit reached, trying reconnect')
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
    register()    
    pull.connect(`tcp://${process.env.PRIMARY_IP}:31337`)    
  }
},1000)

let heartbeatInterval = null 

const pull = zmq.socket('pull')
register()
pull.connect(`tcp://${process.env.PRIMARY_IP}:31337`)

let parsedMsg = {}

pull.on('message', function(topic, msg){
  if (heartbeatInterval === null) {
    heartbeatInterval = setInterval(heartbeat, 1000)
  }
  console.log(Math.floor(Date.now()/1000), 'got message', topic.toString(), msg.toString())
  try {
    parsedMsg = JSON.parse(msg.toString())
  } catch (e) {
    console.log('error parsing message')
  }

  switch (topic.toString()) {
    case 'pins':
      console.log('pins', parsedMsg.toString())
      if (channelMapping[0] !== -1) {
        // const valueIndex = channel.steps.findIndex(o=>o.idx === step) === -1
        pins.forEach((pin,idx)=>{
          const value = parsedMsg[channelMapping[idx]] === 0 
          console.log('writing pin',pin,channelMapping[idx],parsedMsg[channelMapping[idx]])
          gpio.write(
            pin, 
            value === true ? gpio.HIGH : gpio.LOW
          )  
        })
      }
      break;
    case 'mappings':
      // console.log('mappings', parsedMsg)  
      heartbeatLastTime = Date.now()
      const index = parsedMsg.findIndex(o=>o.mac === MAC_ADDRESS)
      if (index === -1) { 
        register() 
      } else {
        channelMapping = parsedMsg[index].mappings
      }   
      break;
    case 'test':
      console.log(parsedMsg)
      if (parsedMsg.mac === MAC_ADDRESS) {
        console.log('testing channels', parsedMsg)
        pins.forEach((pin)=>{
          gpio.write(pin, parsedMsg.value === true ? gpio.LOW : gpio.HIGH)
        })  
      }
      break;
    default:
      break;
  }
})

function heartbeat () {
  httpRequest(`/heartbeat/${MAC_ADDRESS}`)
}

function register () {
  httpRequest(`/register/${MAC_ADDRESS}`)
}

function httpRequest (path) {
  const options = {
    hostname: process.env.PRIMARY_IP,
    method: 'GET',
    port: 8080,
    path
  }

  const req = http.request(options, response => {})

  req.on('error', error => {
    console.log('http error on ',path)
    console.log(error)
  })

  req.end()
}