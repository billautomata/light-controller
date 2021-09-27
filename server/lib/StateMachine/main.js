const StateMachine = require('./lib/StateMachine.js')
const registerConfigFns = require('./lib/Config/_registerConfigFns.js')
const registerIOFns = require('./lib/IO/_registerIOFns.js')
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
  registerPatternFns(s)
  registerPlaylistFns(s)
  registerSequencerFns(s)
  registerSongFns(s)
  registerUtilFns(s)

  if (settings.doInit === false) {
    return s
  }
  initialize(s, settings)
  // console.log('state machine')
  // console.log(s)

  return s
}

function initialize(s, settings) {
  s.initializeSequencer()
  s.loadFromDisk(settings.fileName)
  s.loadPattern()
  s.loadSong()
  s.loadPlaylist()
}