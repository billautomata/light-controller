const fs = require('fs')
const { v4: uuid } = require('uuid')
const gpio = require('./gpio.js')

module.exports = function createStateMachine() {
  let sockets = {}
  let pulse = {}

  let pulseTimeout = {}

  const sequencer = {
    currentStep: -1,
    currentSpeed: 300,
    nextActionTime: 0
  }

  const fileData = JSON.parse(fs.readFileSync('./stateMachineData.json'))

  let config = fileData.config
  config.isPlaying = false
  let patterns = fileData.patterns
  let songs = fileData.songs
  let playlists = fileData.playlists
  const pins = gpio()

  loadPattern(config.activePatternId)
  init()

  function createPattern () {
    const defaultPattern = {
      name: 'New Pattern (' + patterns.length + ')',
      id: uuid(),
      patternLength: 16,
      channels: [
        { id: 'time-channel', name: 'time-channel', steps: [{idx:0, value: 500}]},        
      ].concat(new Array(7).fill(0).map((o,i)=>{
        return {
          id: 'channel-'+i,
          name: 'Channel '+i,
          steps: []
        }
      }))
    }
    patterns.push(defaultPattern)
    console.log('patterns length', patterns.length)
    saveToDisk()
  }

  function deletePattern (id) {
    patterns = patterns.filter(o=>o.id !== id)
    saveToDisk()
  }

  function getPatterns () {
    return patterns
  }

  function tick () {
    clearTimeout(pulseTimeout)

    if(Date.now() > sequencer.nextActionTime) {
      // do the action
      // set the next action time
      process()
    }

    if(config.isPlaying) {
      pulseTimeout = setTimeout(tick, 0)
    }    
  }

  function start () {
    console.log('starting sequencer')
    config.isPlaying = true
    tick()
  }
  function stop () {
    sequencer.currentStep = -1
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })      
    })
    config.isPlaying = false
    clearTimeout(pulseTimeout)
  }

  function process () {
    // step
    sequencer.currentStep += 1
    sequencer.currentStep = sequencer.currentStep % config.activePattern.patternLength

    const timeValue = config.activePattern.channels[0].steps.filter(o=>o.idx === sequencer.currentStep)[0]
    if(timeValue === undefined) {
      // do nothing
    } else {
      sequencer.currentSpeed = timeValue.value
      // console.log(sequencer.currentSpeed, '\n',Date.now())
    }

    sequencer.nextActionTime = Date.now() + sequencer.currentSpeed

    console.log('current step',sequencer.currentStep)

    // emit
    // current step
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })      
    })

    // set pins
    //
    pins.doPins(config.activePattern, sequencer.currentStep)
  }

  function getPattern (id) {
    return patterns.filter(o=>o.id === id)[0]
  }

  function getPatternIndex (id) {
    return patterns.findIndex(o=>o.id === id)
  }

  function loadPattern (id) {
    // loads a pattern into the active pattern
    console.log('loading pattern', id)
    sequencer.currentStep = -1
    sequencer.currentSpeed = 500

    config.activePatternId = id
    config.activePattern = JSON.parse(JSON.stringify(patterns.filter(o=>o.id===config.activePatternId)[0]))
  }

  function registerSockets (_sockets) {
    sockets = _sockets
  }

  function onConnect(socketId) {
    sockets[socketId].emit('state-machine', { config, patterns, songs, playlists })
  }

  function init () {
    nextActionTime = Date.now()    
    currentStep = -1    
    pins.init()
  }

  function saveToDisk () {
    fs.writeFileSync('./stateMachineData.json', JSON.stringify({ config, patterns, songs, playlists },null,2))
  }

  return {
    config,
    patterns,
    songs,
    playlists,
    createPattern,
    deletePattern,
    getPattern,
    getPatterns,
    getPatternIndex,
    loadPattern,
    registerSockets,
    start,
    stop,
    saveToDisk,
    onConnect
  }
}
