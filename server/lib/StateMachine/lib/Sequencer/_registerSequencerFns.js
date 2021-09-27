const getSequencer = require('./getSequencer.js')
const initializeSequencer = require('./initializeSequencer.js')
const startSequencer = require('./startSequencer.js')
const stopSequencer = require('./stopSequencer')
const tickSequencer = require('./tickSequencer')

module.exports = function registerSequencerFns (s) {
  s.getSequencer = getSequencer.bind(s)
  s.initializeSequencer = initializeSequencer.bind(s)
  s.startSequencer = startSequencer.bind(s)
  s.stopSequencer = stopSequencer.bind(s)
  s.tickSequencer = tickSequencer.bind(s)
}