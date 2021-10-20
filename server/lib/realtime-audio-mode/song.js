const fs = require('fs')
const gpio = require('rpio')
const { exec } = require('child_process')

exec("play ~/Desktop/puch.mp3", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});

const pins = [22,26,32,29,31,33] // 35, 37
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
      const valueIndex = channel.steps.findIndex(o=>o.idx === step) === -1
      gpio.write(
        pin, 
        valueIndex === true ? gpio.LOW : gpio.HIGH
      )
    })
  }
  
  return {
    doPins,
    init
  }
}

const song = _gpio()
song.init()

const data = JSON.parse(fs.readFileSync('../reducedData.json'))
console.log('length', data[0].length)

const seconds = 465.29
const timeStep = (456.29 * 1000) / data[0].length
console.log('timestep', timeStep)
let prevIndex = -1

let startTime = Date.now()

setTimeout(()=>{
  startTime = Date.now()
  doPulse()
},900)

function doPulse () {

  const delta = Date.now() - startTime
  const indexToRead = Math.floor(delta / timeStep)
  if(prevIndex !== indexToRead) {
    console.log(indexToRead)
    prevIndex = indexToRead
    console.log(data.map(line=>Number(line[indexToRead]).toFixed(4)).join('\t'))
  }

  if(delta < (seconds * 1000)) {
    setTimeout(doPulse, 0)
  }   
}

module.exports = _gpio
