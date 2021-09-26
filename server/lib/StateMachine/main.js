const StateMachine = require('./lib/StateMachine.js')
const registerConfigFns = require('./lib/Config/_registerConfigFns.js')
const registerPatternFns = require('./lib/Pattern/_registerPatternFns.js')


module.exports = function createStateMachine (config) {
  
  const s = StateMachine()
  registerConfigFns(s)
  registerPatternFns(s)

  // console.log('state machine')
  // console.log(s)

  return s

}