const fs = require('fs')
const { v4: uuid } = require('uuid')
const gpio = require('./gpio-rpio.js')

module.exports = function createStateMachine() {

  const fileData = JSON.parse(fs.readFileSync('./stateMachineData.json'))
  const pins = gpio()

  let sockets = {}
  let pulse = {}

  let pulseTimeout = {}

  const sequencer = {
    currentStep: -1,
    currentSpeed: 300,
    sequenceStarted_ms: -1,
    nextActionTime: 0
  }

  let config = fileData.config
  config.isPlaying = false

  let patterns = fileData.patterns
  let songs = fileData.songs
  let playlists = fileData.playlists


  loadPattern(config.activePatternId)
  loadSong(config.activeSongId)
  // loadPlaylist(config.activePlaylistId)
  init()

  function createPattern () {
    const defaultPattern = {
      name: 'New Pattern (' + patterns.length + ')',
      id: uuid(),
      patternLength: 16,
      channels: [
        { id: 'time-channel', name: 'time-channel', steps: [{idx:0, value: 500}]},        
      ].concat(new Array(16).fill(0).map((o,i)=>{
        return {
          id: 'channel-'+i,
          name: 'Channel '+i,
          steps: []
        }
      }))
    }
    patterns.push(defaultPattern)
    console.log('patterns length', patterns.length)
  }

  function createPlaylist () {
    console.log('state machine - create playlist')
    const defaultPlaylist = {
      name: 'New Playlist (' + playlists.length + ')',
      id: uuid(),
      steps: []
    }
    playlists.push(defaultPlaylist)
    console.log('playlists length', playlists.length)
  }

  function createSong () {
    const defaultSong = {
      name: 'New Song (' + songs.length + ')',
      id: uuid(),
      steps: []
    }
    songs.push(defaultSong)
    console.log('songs length', songs.length)
  }  

  function deletePattern (id) {
    patterns = patterns.filter(o=>o.id !== id)
  }

  function deleteSong(id) {
    songs = songs.filter(o=>o.id !== id)
    console.log('songs.length', songs.length)
  }

  function generateSongSteps (songId) {
    console.log('generateSongSteps', songId)
    let song = songId === 'active' ? JSON.parse(JSON.stringify(config.activeSong)) : JSON.parse(JSON.stringify(songs.filter(o=>o.id===songId)[0]))
    
    const songPattern = []
  
    let songLength = 0
    song.steps.forEach(step=>{
      songLength += patterns.filter(o=>{ return o.id === step.id })[0].patternLength * step.repeat
    })

    if (songId === 'active') {
      config.activeSong.songLength = songLength
    } else {
      song.songLength = songLength
    }
  
    song.steps.forEach(step=>{
      const pattern = patterns.filter(o=>o.id === step.id)[0]      
      let sum_ms = 0
      let currentSpeed = 0

      for(let i = 0; i < pattern.patternLength; i++) {
        const timeForThisStepIdx = pattern.channels[0].steps.findIndex(o=>Number(o.idx)===Number(i))
        if (timeForThisStepIdx !== -1) {
          currentSpeed = pattern.channels[0].steps[timeForThisStepIdx].value / step.speed
        }
        sum_ms += currentSpeed
      }

      for(let i = 0; i < step.repeat; i++) {
        songPattern.push({
          msLength: sum_ms,
          id: pattern.id,          
        })
      }
    })

    const songSteps = (()=>{
      const steps = []
      song.steps.forEach(songStep=>{
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

    return {
      id: song.id,
      steps: songSteps,
      pattern: songPattern
    }

  }

  function getPattern (id) { return patterns.filter(o=>o.id === id)[0] }
  function getPatternIndex (id) { return patterns.findIndex(o=>o.id === id) }
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

  function loadPlaylist (id) {
    console.log('loading playlist', id)
    sequencer.currentStep = -1
    sequencer.currentSpeed = 500

    config.activePlaylistId = id
    config.activePlaylist = JSON.parse(JSON.stringify(playlists.filter(o=>o.id===config.activePlaylistId)[0]))
    playlistFillSteps()
  }

  function onConnect(socketId) {
    sockets[socketId].emit('state-machine', { config, patterns, songs, playlists })
  }
  
  function playlistAddStep (payload) {
    console.log('playlist add step')
    if (config.activePlaylist.steps.length === 0) {
      config.activePlaylist.steps.push({ id: songs[0].id, repeat: 1, speed: 1 })
    } else {
      config.activePlaylist.steps.push(JSON.parse(JSON.stringify(config.activePlaylist.steps[0])))
    }
    console.log('config.activePlaylist.steps',config.activePlaylist.steps)
    // playlistFillSteps()
  }

  function playlistChangeStepOrder (payload) {
    console.log('changing playlist step order', payload)
    console.log(config.activePlaylist.steps)
    if (payload.idx === 0 && payload.direciton === 'up') {
      return
    } else if (payload.idx === config.activeSong.steps.length - 1 && payload.direction === 'down') {
      return
    }
    let a = config.activePlaylist.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)]
    config.activePlaylist.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)] = JSON.parse(JSON.stringify(config.activePlaylist.steps[Number(payload.idx)]))
    config.activePlaylist.steps[Number(payload.idx)] = JSON.parse(JSON.stringify(a))
  }

  function playlistCopyStep (payload) {
    console.log('playlist copy step', payload)
    const stepToCopy = config.activePlaylist.steps[payload.idx]
    config.activePlaylist.steps.push(JSON.parse(JSON.stringify(stepToCopy)))
    playlistFillSteps()
  }  

  function playlistDeleteStep (payload) {
    console.log('playlist delete step')
    config.activePlaylist.steps = config.activePlaylist.steps.filter((o,idx)=>idx !== payload.idx)
    playlistFillSteps()
  }

  function playlistFillSteps () {
    console.log('playlist fill steps')
    const songIds = config.activePlaylist.steps.map(song=>song.id)
    const playlistData =  config.activePlaylist.steps.map(song=>{ return generateSongSteps(song.id) })
    const playlistSteps = playlistData.reduce((a,b)=>{ if(a === undefined) { a = [] }; return a.steps.concat(b.steps) })

    console.log('playlist steps', playlistSteps.length)

    const sums = []
    playlistData.forEach((song,songIdx)=>{
      let sum = 0
      song.pattern.forEach((pattern,patternIdx)=>{
        sum += pattern.msLength
      })
      sums.push({ msLength: sum, id: songIds[songIdx] })      
    })
    config.playlistSteps = playlistSteps
    config.playlistPattern = sums
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
    console.log('song length', config.activeSong.songLength)

    sequencer.currentStep += 1
    sequencer.currentStep = sequencer.currentStep % config.activeSong.songLength

    if (sequencer.currentStep === 0) {
      sequencer.sequenceStarted_ms = Date.now()
    }

    console.log(config.songSteps.slice(0,1))
    console.log(sequencer.currentStep)

    if (config.songSteps[sequencer.currentStep][0] !== 0) {
      // time value found
      sequencer.currentSpeed = config.songSteps[sequencer.currentStep][0]
    }

    sequencer.nextActionTime = Date.now() + sequencer.currentSpeed

    console.log(['current step', sequencer.currentStep, config.songSteps[sequencer.currentStep].join(',')].join('\t'))

    const sum = config.songPattern.map(o=>o.msLength).reduce((a,b)=>a+b)
    const percentElapsed = (Date.now() - sequencer.sequenceStarted_ms) / sum

    // console.log('sum', sum, 'percent elapsed', percentElapsed)

    // emit
    // current step
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })
      socket.emit('set-step-time', { value: percentElapsed })
    })

    pins.doPinsRaw(config.songSteps[sequencer.currentStep])

  }

  function processPlaylist () {

    console.log('playlist length', config.playlistSteps.length)

    sequencer.currentStep += 1
    sequencer.currentStep = sequencer.currentStep % config.playlistSteps.length

    if (sequencer.currentStep === 0) {
      sequencer.sequenceStarted_ms = Date.now()
    }

    console.log(config.playlistSteps.slice(0,1))
    console.log(sequencer.currentStep)

    if (config.playlistSteps[sequencer.currentStep][0] !== 0) {
      // time value found
      sequencer.currentSpeed = config.playlistSteps[sequencer.currentStep][0]
    }

    sequencer.nextActionTime = Date.now() + sequencer.currentSpeed

    console.log(['current step', sequencer.currentStep, config.playlistSteps[sequencer.currentStep].join(',')].join('\t'))

    const sum = config.playlistPattern.map(o=>o.msLength).reduce((a,b)=>a+b)
    const percentElapsed = (Date.now() - sequencer.sequenceStarted_ms) / sum

    // console.log('sum', sum, 'percent elapsed', percentElapsed)

    // emit
    // current step
    Object.values(sockets).forEach(socket=>{
      if(socket === null) {
        return
      }
      socket.emit('set-step', { value: sequencer.currentStep })
      socket.emit('set-step-time', { value: percentElapsed })
    })

    pins.doPinsRaw(config.playlistSteps[sequencer.currentStep])    

  }

  function registerSockets (_sockets) {
    sockets = _sockets
  }

  function savePlaylist () {
    console.log('saving playlist')
    const playlistIndex = playlists.findIndex(o=>o.id === config.activePlaylistId)
    playlists[playlistIndex] = JSON.parse(JSON.stringify(config.activePlaylist))
  }

  function saveToDisk () {
    fs.writeFileSync('./stateMachineData.json', JSON.stringify({ config, patterns, songs, playlists },null,2))
  }

  function saveSong () {
    console.log('saving song')
    const songIndex = songs.findIndex(o=>o.id === config.activeSongId)
    songs[songIndex] = JSON.parse(JSON.stringify(config.activeSong))
  }

  function songAddStep (payload) {
    console.log('song add step', payload)
    if (config.activeSong.steps.length === 0) {
      config.activeSong.steps.push({ id: patterns[0].id, repeat: 1, speed: 1 })
    } else {
      config.activeSong.steps.push(JSON.parse(JSON.stringify(config.activeSong.steps[0])))
    }
    songFillSteps()
  }

  function songFillSteps () {
    const o = JSON.parse(JSON.stringify(generateSongSteps('active')))

    config.songPattern = o.pattern 
    config.songSteps = o.steps
  }

  function songChangeStepOrder (payload) {
    console.log('changing song step order', payload)
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
    console.log('song delete step', payload)
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
          processPlaylist()
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
    createPlaylist,
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
    loadPlaylist,
    loadSong,
    onConnect,
    playlistAddStep,
    playlistChangeStepOrder,
    playlistCopyStep,
    playlistDeleteStep,
    registerSockets,    
    savePlaylist,
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
