const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = function createStateMachine() {
  let sockets = {}
  let pulse = {}

  let pulseTimeout = {}

  const sequencer = {
    currentStep: 0,
    currentSpeed: 300,
    nextActionTime: 0
  }

  const fileData = JSON.parse(fs.readFileSync('./stateMachineData.json'))

  let config = fileData.config
  let patterns = fileData.patterns
  let songs = fileData.songs
  let playlists = fileData.playlists

  loadPattern(config.activePatternId)
  init()

  function tick () {
    clearTimeout(pulseTimeout)

    if(Date.now() > nextActionTime) {
      // do the action
      // set the next action time
      process()
    }

    if(isPlaying) {
      pulseTimeout = setTimeout(tick, 0)
    }    
  }

  function start () {
    config.isPlaying = true
    tick()
  }
  function stop () {
    config.isPlaying = false
    clearTimeout(pulseTimeout)
  }

  function process () {
    // step
    currentStep += 1
    currentStep %= activePattern.patternLength

    // emit
    // current step
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('CURRENT_STEP', { value: currentStep })      
    })

    // set pins
    //
  }

  function getPattern (id) {
    return patterns.filter(o=>o.id === id)[0]
  }

  function getPatternIndex (id) {
    return patterns.findIndex(o=>o.id === id)
  }

  function loadPattern (id) {
    // loads a pattern into the active pattern
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
  }

  return {
    config,
    patterns,
    songs,
    playlists,
    getPattern,
    getPatternIndex,
    loadPattern,
    registerSockets,
    onConnect
  }
}



const patterns = [
  { 
    id: '0',
    name: 'Basic Pattern',
    patternLength: 10,
    patternStart: 0,
    patternEnd: 10,
    channels: [
      { 
        id: 'TIME_CHANNEL',
        name: 'TIME_CHANNEL', 
        steps: [
          { value: 500 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: 50 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 }
        ]
      },
      { 
        id: 0,
        name: 'Center Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ]
      },
      { 
        id: 1,
        name: '2nd Floor Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ]
      }      
    ]
  },
  { 
    id: '4',
    name: 'Longer Pattern',
    patternLength: 20,
    patternStart: 0,
    patternEnd: 20,
    channels: [
      { 
        id: 'TIME_CHANNEL',
        name: 'TIME_CHANNEL', 
        steps: [
          { value: 500 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: 50 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 }
        ]
      },
      { 
        id: 0,
        name: 'Center Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },          
        ]
      },
      { 
        id: 1,
        name: '2nd Floor Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 }, 
        ]
      }      
    ]
  }  
]