const bootConfig = require('./bootConfig.js')
const getConfig = require('./getConfig.js')
const loadPattern = require('./loadPattern.js')
const loadPlaylist = require('./loadPlaylist.js')
const loadSong = require('./loadSong.js')

module.exports = function registerConfigFns (s) {
  s.bootConfig = bootConfig.bind(s)
  s.getConfig = getConfig.bind(s)
  s.loadPattern = loadPattern.bind(s)
  s.loadPlaylist = loadPlaylist.bind(s)
  s.loadSong = loadSong.bind(s)
}