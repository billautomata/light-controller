const gpio = require('rpio')

// const pins = [22,26,32,29,31,33,35,37]
const pins = [7,11,13,15,29,31,33,35,12,16,18,22,26,32,36,38]

module.exports = { setupPins, writePins }

function setupPins () {
  console.log('initializing pins')
  pins.forEach((pin,pinIdx)=>{
    console.log('setting up pin: ' + pinIdx + ' ' + pin)
    gpio.open(pin, gpio.OUTPUT)
  })
}

function writePins (array) {
  // console.log('writing', array.toString(), 'to pins')
  pins.forEach((pin,pinIdx)=>{
    gpio.write(
      pin,
      array[pinIdx] === 0 ? gpio.HIGH : gpio.LOW
    )
  })
}
