const gpio = require('rpio')

const pins = [22,26,32,29,31,33,35,37]
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
      console.log('setting up pin: ' + pinIdx + ' ' + pin)
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
      const valueIndex = channel.steps.findIndex(o=>o.idx === step) === -1
      gpio.write(
        pin, 
        valueIndex === true ? gpio.HIGH : gpio.LOW
      )
    })
  }

  function doPinsRaw (array) {
    pins.forEach((pin,pinIdx)=>{
      gpio.write(
        pin,
        array[pinIdx+1] === 0 ? gpio.HIGH : gpio.LOW
      )
    })
  }
  
  return {
    doPins,
    doPinsRaw,
    init
  }
}

module.exports = _gpio
