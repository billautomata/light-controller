const generatePatternData = require('./generatePatternData.js')
const generatePlaylistData = require('./generatePlaylistData.js')
const generateSongData = require('./generateSongData.js')
const processPattern = require('./processPattern.js')
const processPlaylist = require('./processPlaylist.js')
const processSong = require('./processSong.js')

module.exports = function registerUtilFns (s) {
  s.generatePatternData = generatePatternData.bind(s)
  s.generatePlaylistData = generatePlaylistData.bind(s)
  s.generateSongData = generateSongData.bind(s)  
  s.processPattern = processPattern.bind(s)
  s.processPlaylist = processPlaylist.bind(s)
  s.processSong = processSong.bind(s)
}