const test = require('tape')
const createStateMachine = require('../lib/StateMachine/main.js')

test('createPattern', t => {
  t.plan(1)
  const s = createStateMachine({ doInit: false })
  s.createPattern()
  t.equal(s.getPatterns().length,1,'one pattern exists on the pattern list')
})

test('deletePattern', t => {
  t.plan(2)

  const s = createStateMachine({ doInit: false })
  s.createPattern()
  s.createPattern()

  const id0 = s.getPatterns()[0].id
  const id1 = s.getPatterns()[1].id

  s.deletePattern(id0)

  t.equal(s.getPatterns().length, 1, 'one pattern exists on the pattern list after the pattern is deleted')
  t.equal(s.getPatterns()[0].id, id1, 'the correct remaining pattern exists')  
})

test('loadPattern', t => {
  t.plan(2)

  const s = createStateMachine({ doInit: false })
  s.createPattern()

  const id = s.getPatterns()[0].id

  s.loadPattern(id)

  const config = s.getConfig()

  t.equal(config.activePatternId, id, 'active pattern id matches selected pattern')
  t.deepEqual(config.activePattern, s.getPatterns()[0], 'active pattern data matches selected pattern')
})
