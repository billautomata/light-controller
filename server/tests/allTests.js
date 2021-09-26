const test = require('tape')
const createStateMachine = require('../lib/StateMachine.js')

test('imports correctly', t => {
  t.plan(1)
  const s = createStateMachine()
  t.ok(s, 'state machine imports and initializes without errors')
})

test('active pattern, song, and playlist load', t => {
  const s = createStateMachine()
  const config = s.getConfig()
  console.log(Object.keys(config))
  console.log(config.playingMode)
  t.plan(1)
  t.ok(true)
})
// test('playlistFillSteps', t=>{})