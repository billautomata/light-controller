const gpio = require('rpi-gpio')

const pins = [11,21,22,23,24]
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
      gpio.setup(pin, gpio.DIR_OUT, (err)=>{      
        pinStats[pinIdx].doneSetup = true
        if(err) { 
          console.log(`error setting up channel ${pinIdx} pin ${pin}`)
          error = true;
          pinStats[pinIdx].error = true
        }
        if(pinStats.filter(o=>o.doneSetup).length === pinStats.length) {
          console.log('pins done being setup')
          console.log('errors on '+pinStats.filter(o=>o.doneSetup).length+' pins')
          console.log(pinStats.map(pin=>{ return `channel ${pinIdx} - pin ${pin.pinNumber} - error? ${pin.error}` }).join('\n'))
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
