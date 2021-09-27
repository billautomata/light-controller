const fs = require('fs')

module.exports = { loadFromDisk, saveToDisk }

function loadFromDisk (fileName) {
  const fileData = JSON.parse(fs.readFileSync(fileName, 'utf-8'))

  this.config.activePatternId = fileData.config.activePatternId
  this.config.activePlaylistId = fileData.config.activePlaylistId
  this.config.activeSongId = fileData.config.activeSongId

  this.patterns = fileData.patterns
  this.playlists = fileData.playlists
  this.songs = fileData.songs
}

function saveToDisk (fileName) {
}

