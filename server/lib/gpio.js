const gpio = require('rpi-gpio')

const pins = [6,11,26,21,22,23,24,25]
let error = false

function _gpio () {
  function init () {
    pins.forEach((pin,pinIdx)=>{
      gpio.setup(pin, gpio.DIR_OUT, (err)=>{
        if(err) { error = true; console.log(`error setting up channel ${pinIdx} pin ${pin}`)}
      })
    })
  }
  function doPins (pattern, step) {
    if (error) { return }
    pattern.channels.map((channel,channelIdx)=>{
      if (channelIdx === 0) {
        return
      }
      const valueIndex = channel.steps.findIndex(o=>o.idx === step)
      gpio.write(
        pins[channelIdx-1], 
        valueIndex === undefined ? false : true, 
        err=>{
          if(err) {
            console.log(`error writing to channel ${channelIdx-1} which is pin ${pins[channelIdx-1]}`)
          }          
        })
    })
  }
  
  return {
    doPins,
    init
  }
}

module.exports = _gpio
