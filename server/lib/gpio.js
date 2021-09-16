const gpio = require('rpi-gpio')

const pins = [11,21,22,23,24]
let error = false
let setupComplete = false

function _gpio () {
  function init () {
    console.log('initializing pins')
    pins.forEach((pin,pinIdx)=>{
      gpio.setup(pin, gpio.DIR_OUT, (err)=>{
        console.log('setting up pin: ' + pinIdx)
        if(err) { 
          error = true; 
          console.log(`error setting up channel ${pinIdx} pin ${pin}`)
        } else {
        }
        if(pinIdx === pins.length-1) {
          if(error) {
            console.log('FAILED - attempt to set up pins complete with errors')
          } else {
            console.log('SUCCESS - attempt to set up pins complete')
          }
          
          setupComplete = true
        }
      })
    })
  }
  function doPins (pattern, step) {
    if (error || setupComplete === false) { return }

    pins.forEach((pin,pinIdx) => {
      const channelIdx = pinIdx + 1
      const channel = pattern.channels[channelIdx]
      if(channel === undefined) {
        return
      }
      const valueIndex = channel.steps.findIndex(o=>o.idx === step)
      gpio.write(
        pin, 
        valueIndex === undefined ? false : true,
        err=>{
          if(err) {
            console.log(`error writing to channel ${channelIdx} which is pin ${pin}`)
          }          
        }
      )
    })
  }
  
  return {
    doPins,
    init
  }
}

module.exports = _gpio
