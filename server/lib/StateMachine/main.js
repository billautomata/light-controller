const StateMachine = require('./lib/StateMachine.js')
const registerConfigFns = require('./lib/Config/_registerConfigFns.js')
const registerIOFns = require('./lib/IO/_registerIOFns.js')
const registerNetworkDevice = require('./lib/NetworkDevice/_registerNetworkDeviceFns.js')
const registerPatternFns = require('./lib/Pattern/_registerPatternFns.js')
const registerPlaylistFns = require('./lib/Playlist/_registerPlaylistFns.js')
const registerSongFns = require('./lib/Song/_registerSongFns.js')
const registerSequencerFns = require('./lib/Sequencer/_registerSequencerFns.js')
const registerUtilFns = require('./lib/Util/_registerUtilFns.js')

module.exports = function createStateMachine (settings) {
  if (settings === undefined) { settings = {} }
  
  const s = StateMachine()
  registerConfigFns(s)
  registerIOFns(s)
  registerNetworkDevice(s)
  registerPatternFns(s)
  registerPlaylistFns(s)
  registerSequencerFns(s)
  registerSongFns(s)
  registerUtilFns(s)

  if (settings.doInit === false) {
    return s
  }
  initialize(s, settings)
  return s
}

function initialize(s, settings) {
  s.initializeSequencer()
  s.setupPins()
  s.loadFromDisk(settings.fileName)
  s.loadPattern(s.config.activePatternId)
  s.loadSong(s.config.activeSongId)
  s.loadPlaylist(s.config.activePlaylistId)
  s.initZMQ()
}