const getSequencer = require('./getSequencer.js')
const initializeSequencer = require('./initializeSequencer.js')

module.exports = function registerConfigFns (s) {
  s.getSequencer = getSequencer.bind(s)
  s.initializeSequencer = initializeSequencer.bind(s)
  // s.startSequencer = startSequencer.bind(s)
  // s.stopSequencer = stopSequencer.bind(a)
  // 
}