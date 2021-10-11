require('dotenv').config()
const http = require('http')
const _ = require('underscore')
const gpio = require('rpio')

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
    pull.connect(`tcp://${process.env.PRIMARY_IP}:31337`)
    register()    
  }
},1000)

const zmq = require('zeromq')
const pull = zmq.socket('pull')
pull.connect(`tcp://${process.env.PRIMARY_IP}:31337`)
register()

let parsedMsg = {}

pull.on('message', function(topic, msg){
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
      console.log('mappings', parsedMsg)  
      heartbeatLastTime = Date.now()
      const index = parsedMsg.findIndex(o=>o.mac === MAC_ADDRESS)
      if (index === -1) { 
        register() 
      } else {
        channelMapping = parsedMsg[index].mappings
      }   
      break;
    default:
      break;
  }

  // if(parsedMsg.mappings === undefined) {
  //   return
  // }

  // if(parsedMsg.mappings[MAC_ADDRESS] === undefined) {
  //   // send registration
  //   console.log('mac not found in mapping -- sending registration')

  // }

  // console.log(Math.floor(Date.now()/1000), topic.toString(), msg.toString())
})

function register () {
  const options = {
    hostname: process.env.PRIMARY_IP,
    method: 'GET',
    port: 8080,
    path: '/register/' + MAC_ADDRESS,
  }

  const req = http.request(options, response => {})

  req.on('error', error => {
    console.log('error on registration')
    console.log(error)
  })

  req.end()
}