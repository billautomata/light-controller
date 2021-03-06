const test = require('tape')
const createStateMachine = require('../lib/StateMachine/main.js')

test('generatePatternData', t => {
  t.plan(2)

  const s = createStateMachine({ doInit: false })

  s.createPattern()

  const d = s.generatePatternData(s.getPatterns()[0].id)

  t.equal(d.patternData.patternLength, 16, 'pattern length is correctly calculated')
  t.equal(s.getPatterns().length, 1, 'one pattern exists on the pattern list')
})

test('generateSongData', t => {
  t.plan(2)

  const s = createStateMachine({ doInit: false })
  s.createPattern()
  s.createPattern()

  s.createSong()
  const song = s.getSongs()[0]
  song.steps.push({ id: s.getPatterns()[0].id, speed: 1, repeat: 1 })
  song.steps.push({ id: s.getPatterns()[1].id, speed: 1, repeat: 2 })

  const p = s.generateSongData(song.id)

  t.equal(p.songLength, 48, 'song length is correctly calculated')
  t.equal(s.getPatterns().length, 2, 'two patterns exists on the pattern list')
})

test('generatePlaylistData', t => {
  t.plan(2)

  const s = createStateMachine({ doInit: false })
  
  s.createPattern()
  s.createPattern()

  s.createSong()
  s.createSong()

  const songA = s.getSongs()[0]
  songA.steps.push({ id: s.getPatterns()[0].id, speed: 1, repeat: 1 })
  songA.steps.push({ id: s.getPatterns()[1].id, speed: 1, repeat: 1 })

  const songB = s.getSongs()[1]
  songB.steps.push({ id: s.getPatterns()[1].id, speed: 1, repeat: 1 })
  songB.steps.push({ id: s.getPatterns()[0].id, speed: 1, repeat: 1 })

  s.createPlaylist()

  const playlist = s.getPlaylists()[0]

  playlist.steps.push({ id: songA.id, speed: 1, repeat: 1 })
  playlist.steps.push({ id: songB.id, speed: 1, repeat: 1 })

  const p = s.generatePlaylistData(playlist.id)

  t.equal(p.playlistLength, 64, 'playlist length is correctly calculated')
  t.equal(s.getPatterns().length, 2, 'two patterns exists on the pattern list')
})
