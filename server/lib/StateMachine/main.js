const StateMachine = require('./lib/StateMachine.js')
const registerConfigFns = require('./lib/Config/_registerConfigFns.js')
const registerIOFns = require('./lib/IO/_registerIOFns.js')
const registerPatternFns = require('./lib/Pattern/_registerPatternFns.js')
const registerPlaylistFns = require('./lib/Playlist/_registerPlaylistFns.js')
const registerSongFns = require('./lib/Song/_registerSongFns.js')
const registerSequencerFns = require('./lib/Sequencer/_registerSequencerFns.js')
const registerUtilFns = require('./lib/Util/_registerUtilFns.js')

module.exports = function createStateMachine (config) {
  const s = StateMachine()
  registerConfigFns(s)
  registerIOFns(s)
  registerPatternFns(s)
  registerPlaylistFns(s)
  registerSequencerFns(s)
  registerSongFns(s)
  registerUtilFns(s)

  // console.log('state machine')
  // console.log(s)

  return s
}