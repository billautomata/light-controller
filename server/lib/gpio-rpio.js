const gpio = require('rpio')

const pins = [22]
let error = false
let setupComplete = false

const pinStats = pins.map(pinNumber=>{
  return {
    doneSetup: false,
    error: false,
    pinNumber
  }
})

function _gpio () {
  function init () {
    console.log('initializing pins')
    pins.forEach((pin,pinIdx)=>{
      console.log('setting up pin: ' + pinIdx)
      gpio.open(pin, gpio.OUTPUT)
    })
  }
  function doPins (pattern, step) {

    pins.forEach((pin,pinIdx) => {
      const channelIdx = pinIdx + 1
      const channel = pattern.channels[channelIdx]
      if(channel === undefined) {
        console.log('undefined channel' + channelIdx)
        return
      }
      const valueIndex = channel.steps.findIndex(o=>o.idx === step)
      gpio.write(
        pin, 
        valueIndex === undefined ? gpio.LOW : gpio.HIGH
      )
    })
  }
  
  return {
    doPins,
    init
  }
}

module.exports = _gpio
