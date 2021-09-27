const test = require('tape')
const createStateMachine = require('../lib/StateMachine/main.js')

test('intialize from disk', t => {
  t.plan(2)
  const s = createStateMachine({ fileName: './tests/data/stateMachineData.json' })  

  console.log(s.config.activeSong)
  console.log('songdata steps length', s.config.songData.steps.length)

  t.equal(s.config.patternData.steps.length, 16, 'pattern data correct length')
  t.ok(s, 'initializes properly')
})