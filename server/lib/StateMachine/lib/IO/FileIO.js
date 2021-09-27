const fs = require('fs')

module.exports = { loadFromDisk, saveToDisk }

function loadFromDisk (fileName) {
  const fileData = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  console.log(fileData)

  this.config.activePatternId = fileData.activePatternId
  this.config.activePlaylistId = fileData.activePlaylistId
  this.config.activeSongId = fileData.activeSongId

  this.patterns = fileData.patterns
  this.playlists = fileData.playlists
  this.songs = fileData.songs
}

function saveToDisk (fileName) {
}

