const test = require('tape')
const createStateMachine = require('../lib/StateMachine/main.js')

test('generatePatternData', t => {
  t.plan(1)
  const s = createStateMachine({ fileName: './tests/data/stateMachineData.json' })
  t.ok(s, 'initializes properly')
})