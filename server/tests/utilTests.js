const test = require('tape')
const createStateMachine = require('../lib/StateMachine/main.js')

test('generatePatternData', t => {
  t.plan(1)
  const s = createStateMachine()
  s.createPattern()
  s.generatePatternData(s.getPatterns()[0].id)

  t.equal(s.getPatterns().length,1,'one pattern exists on the pattern list')
})


test('generateSongData', t => {
  t.plan(1)
  const s = createStateMachine()
  s.createPattern()
  s.createPattern()

  s.createSong()

  const song = s.getSongs()[0]
  song.steps.push({ id: s.getPatterns()[0].id, speed: 1, repeat: 1 })
  song.steps.push({ id: s.getPatterns()[1].id, speed: 1, repeat: 1 })

  s.generateSongData(song.id)

  t.equal(s.getPatterns().length,1,'one pattern exists on the pattern list')
})
