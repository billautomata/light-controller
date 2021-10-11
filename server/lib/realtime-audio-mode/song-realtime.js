const fs = require('fs')
const { spawn } = require('child_process')

let startTime = -1
let isTimeSynced = false
let currentIndex = -1
const stats = JSON.parse(fs.readFileSync('./songStats.json').toString())

function getPoundSymbols (value) {
  const min = 0
  const max = 40
  const v = Math.min(max,value)
  const maxPounds = 7
  const nPounds = Math.ceil((v/max)*maxPounds)
  const nSpaces = maxPounds - nPounds
  if(nSpaces > 0) {
    return new Array(nPounds).fill('#').concat(new Array(nSpaces).fill(' ')).join('')
  } else {
    return new Array(nPounds).fill('#').join('')
  }
  
}

console.log('Song Length', stats.length, 'seconds')
console.log('FFT Samples', stats.fftBuckets[0].length)

const msPerStep = stats.fftBuckets[0].length / stats.length

const child = spawn("play", [[stats.path,stats.fileName].join('')])

child.on('error', err => {
  console.log(err)
})

child.stdout.on('data', (d)=>{
  console.log(d)
})

function doPulse () {

  if(isTimeSynced === false) {
    return setTimeout(doPulse, 0)
  }

  const delta = Date.now() - startTime
  const index = Math.floor((0.5*delta)/msPerStep)

  if(index !== currentIndex) {
    console.log(stats.fftBuckets.map(o=>o[index]).map(o=>getPoundSymbols(o)).join('\t'))
    currentIndex = index
  }

  setTimeout(doPulse, 0)
}

doPulse()

child.stderr.on('data', (d)=>{
  const t = d.toString().split(' ')[1]
  if (t.indexOf('00') === 0) {
    const ms = convertHHMMSS_to_ms(t)
    if(isTimeSynced === false) {
      isTimeSynced = true      
      startTime = Date.now() - ms
    }
    
    // console.log(d.toString().split(' ')[1], Date.now() - startTime)
  }
})

function convertHHMMSS_to_ms (_string) {
  const hh = Number(_string.split('.')[0].split(':')[0])
  const mm = Number(_string.split('.')[0].split(':')[1])
  const ss = Number(_string.split('.')[0].split(':')[2])
  const ms = Number(_string.split('.')[1])
  return (hh*60*60*1000) + (mm*60*1000) + (ss*1000) + (ms*10)
}

child.on('end', ()=>{
  process.exit()
})