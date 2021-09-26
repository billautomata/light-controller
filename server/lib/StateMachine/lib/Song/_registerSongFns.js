const createSong = require('./createSong.js')
const deleteSong = require('./deleteSong.js')
const getSongs = require('./getSongs.js')
const getSongById = require('./getSongById.js')
const getSongIndex = require('./getSongIndex.js')
const loadSong = require('./loadSong.js')

module.exports = function registerSongFns (s) {
  s.createSong = createSong.bind(s)
  s.deleteSong = deleteSong.bind(s)
  s.getSongs = getSongs.bind(s)
  s.getSongById = getSongById.bind(s)
  s.getSongIndex = getSongIndex.bind(s)
  s.loadSong = loadSong.bind(s)
}
