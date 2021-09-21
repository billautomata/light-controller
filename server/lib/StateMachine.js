const fs = require('fs')
const { v4: uuid } = require('uuid')
const gpio = require('./gpio-rpio.js')

module.exports = function createStateMachine() {
  let sockets = {}
  let pulse = {}

  let pulseTimeout = {}

  const sequencer = {
    currentStep: -1,
    currentSpeed: 300,
    sequenceStarted_ms: -1,
    nextActionTime: 0
  }

  const fileData = JSON.parse(fs.readFileSync('./stateMachineData.json'))

  let config = fileData.config
  config.isPlaying = false
  config.activeSong.songPattern = []
  let patterns = fileData.patterns
  let songs = fileData.songs
  let playlists = fileData.playlists
  const pins = gpio()

  loadPattern(config.activePatternId)
  loadSong(config.activeSongId)
  init()

  function createPattern () {
    const defaultPattern = {
      name: 'New Pattern (' + patterns.length + ')',
      id: uuid(),
      patternLength: 16,
      channels: [
        { id: 'time-channel', name: 'time-channel', steps: [{idx:0, value: 500}]},        
      ].concat(new Array(8).fill(0).map((o,i)=>{
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

  function createSong () {
    const defaultSong = {
      name: 'New Song (' + songs.length + ')',
      id: uuid(),
      steps: []
    }
    songs.push(defaultSong)
    console.log('songs length', songs.length)
    saveToDisk()
  }  

  function deletePattern (id) {
    patterns = patterns.filter(o=>o.id !== id)
    saveToDisk()
  }

  function deleteSong(id) {
    songs = songs.filter(o=>o.id !== id)
    console.log('songs.length', songs.length)
    saveToDisk()
  }

  function getPattern (id) {
    return patterns.filter(o=>o.id === id)[0]
  }

  function getPatternIndex (id) {
    return patterns.findIndex(o=>o.id === id)
  }

  function getConfig () { return config }
  function getPatterns () { return patterns }
  function getPlaylists () { return playlists }
  function getSongs () { return songs }

  function init () {
    nextActionTime = Date.now()    
    currentStep = -1    
    pins.init()
  }

  function loadPattern (id) {
    // loads a pattern into the active pattern
    console.log('loading pattern', id)
    sequencer.currentStep = -1
    sequencer.currentSpeed = 500

    config.activePatternId = id
    config.activePattern = JSON.parse(JSON.stringify(patterns.filter(o=>o.id===config.activePatternId)[0]))
  }

  function loadSong (id) {
    console.log('loading song', id)
    sequencer.currentStep = -1
    sequencer.currentSpeed = 500

    config.activeSongId = id
    config.activeSong = JSON.parse(JSON.stringify(songs.filter(o=>o.id===config.activeSongId)[0]))
    songFillSteps()
  }

  function onConnect(socketId) {
    sockets[socketId].emit('state-machine', { config, patterns, songs, playlists })
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

    const channelValues = config.activePattern.channels
      .filter((o,i)=>i>0)
      .map(o=>{ return o.steps.filter(o=>o.idx === sequencer.currentStep)[0] === undefined ? 0 : o.steps.filter(o=>o.idx === sequencer.currentStep)[0].value })

    console.log(['current step', sequencer.currentStep, channelValues.toString()].join('\t'))

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

  function processSong () {
    // step
    sequencer.currentStep += 1
    sequencer.currentStep = sequencer.currentStep % config.activeSong.songLength

    if (sequencer.currentStep === 0) {
      sequencer.sequenceStarted_ms = Date.now()
    }

    if (config.activeSong.songSteps[sequencer.currentStep][0] !== 0) {
      // time value found
      sequencer.currentSpeed = config.activeSong.songSteps[sequencer.currentStep][0]
    }

    sequencer.nextActionTime = Date.now() + sequencer.currentSpeed

    console.log(['current step', sequencer.currentStep, config.activeSong.songSteps[sequencer.currentStep].join(',')].join('\t'))

    const sum = config.activeSong.songPattern.map(o=>o.msLength).reduce((a,b)=>a+b)
    const percentElapsed = (Date.now() - sequencer.sequenceStarted_ms) / sum

    console.log('sum', sum, 'percent elapsed', percentElapsed)

    // emit
    // current step
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })
      socket.emit('set-step-time', { value: percentElapsed })
    })

    // gpio.doPinsRaw(config.activeSong.songSteps[sequencer.currentStep])

  }

  function registerSockets (_sockets) {
    sockets = _sockets
  }

  function saveToDisk () {
    songFillSteps()
    fs.writeFileSync('./stateMachineData.json', JSON.stringify({ config, patterns, songs, playlists },null,2))
  }

  function saveSong () {
    console.log('saving song')
    const songIndex = songs.findIndex(o=>o.id === config.activeSongId)
    songs[songIndex] = JSON.parse(JSON.stringify(config.activeSong))
  }

  function songAddStep (payload) {
    console.log('song add step', payload)
    songFillSteps()
  }

  function songFillSteps () {
    const songPattern = []

    let songLength = 0
    config.activeSong.steps.forEach(step=>{
      songLength += patterns.filter(o=>{ return o.id === step.id })[0].patternLength * step.repeat
    })

    config.activeSong.songLength = songLength

    config.activeSong.steps.forEach(step=>{
      const pattern = patterns.filter(o=>o.id === step.id)[0]      
      let sum_ms = 0
      let currentSpeed = 0

      for(let i = 0; i < pattern.patternLength; i++) {
        const timeForThisStepIdx = pattern.channels[0].steps.findIndex(o=>Number(o.idx)===Number(i))
        if (timeForThisStepIdx !== -1) {
          currentSpeed = pattern.channels[0].steps[timeForThisStepIdx].value
        }
        sum_ms += currentSpeed
      }
      console.log('sum_ms', sum_ms)

      for(let i = 0; i < step.repeat; i++) {
        songPattern.push({
          msLength: sum_ms,
          id: pattern.id,          
        })
      }
    })

    config.activeSong.songPattern = songPattern
    config.activeSong.songSteps = (()=>{
      const steps = []

      config.activeSong.steps.forEach(songStep=>{
        const pattern = patterns.filter(o=>o.id===songStep.id)[0]
        for(let j = 0; j < songStep.repeat; j++) {
          for(let i = 0; i < pattern.patternLength; i++) {
            steps.push(pattern.channels.map(
              (channel,channelIdx) => { 
                return channel.steps.findIndex(o=>Number(o.idx)===Number(i)) === -1 ? 0 : channel.steps.filter(o=>Number(o.idx)===Number(i))[0].value / (channelIdx === 0 ? songStep.speed : 1)
              }))
          }  
        }
      })

      return steps
    })()
  }

  function songChangeStepOrder (payload) {
    console.log('changing step order', payload)
    console.log(config.activeSong.steps)
    if (payload.idx === 0 && payload.direciton === 'up') {
      return
    } else if (payload.idx === config.activeSong.steps.length - 1 && payload.direction === 'down') {
      return
    }
    let a = config.activeSong.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)]
    config.activeSong.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)] = JSON.parse(JSON.stringify(config.activeSong.steps[Number(payload.idx)]))
    config.activeSong.steps[Number(payload.idx)] = JSON.parse(JSON.stringify(a))
    songFillSteps()
  }

  function songCopyStep (payload) {
    console.log('song copy step', payload)
    const stepToCopy = config.activeSong.steps[payload.idx]
    config.activeSong.steps.push(JSON.parse(JSON.stringify(stepToCopy)))
    songFillSteps()
  }

  function songDeleteStep (payload) {
    console.log('song deleting step', payload)
    config.activeSong.steps = config.activeSong.steps.filter((o,idx)=>idx !== payload.idx)
    songFillSteps()
  }

  function start (payload) {
    console.log('starting sequencer')
    config.isPlaying = true
    config.playingMode = payload.mode
    console.log(config.playingMode)
    sequencer.sequenceStarted_ms = Date.now()
    tick()
  }

  function stop () {
    sequencer.currentStep = -1
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })      
      socket.emit('set-step-time', { value: 0 })      
    })
    config.isPlaying = false
    clearTimeout(pulseTimeout)
  }

  function tick () {

    clearTimeout(pulseTimeout)

    if(Date.now() > sequencer.nextActionTime) {
      // do the action
      // set the next action time
      switch (config.playingMode) {
        case 'pattern':
          process()
          break;
        case 'song':
          processSong()
          break;
        default:
          break;
      }
      
    }

    if(config.isPlaying) {
      pulseTimeout = setTimeout(tick, 0)
    }    
  }

  return {
    config,
    patterns,
    songs,
    playlists,
    createPattern,
    createSong,
    deletePattern,
    deleteSong,
    getConfig,
    getPattern,
    getPatterns,
    getPatternIndex,
    getPlaylists,
    getSongs,
    loadPattern,
    loadSong,
    onConnect,
    registerSockets,    
    saveToDisk,
    saveSong,
    songAddStep,
    songChangeStepOrder,
    songCopyStep,    
    songDeleteStep,    
    songFillSteps,
    start,
    stop,        
  }
}
