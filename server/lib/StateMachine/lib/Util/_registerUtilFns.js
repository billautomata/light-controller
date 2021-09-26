const generatePatternData = require('./generatePatternData.js')
const generatePlaylistData = require('./generatePlaylistData.js')
const generateSongData = require('./generateSongData.js')

module.exports = function registerConfigFns (s) {
  s.generatePatternData = generatePatternData.bind(s)
  s.generatePlaylistData = generatePlaylistData.bind(s)
  s.generateSongData = generateSongData.bind(s)  
}