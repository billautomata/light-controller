const fs = require('fs')

module.exports = { loadFromDisk, saveToDisk }

function loadFromDisk (fileName) {
  const fileData = JSON.parse(fs.readFileSync('./data/state-machine.json').toString())

  this.config.activePatternId = fileData.config.activePatternId
  this.config.activePlaylistId = fileData.config.activePlaylistId
  this.config.activeSongId = fileData.config.activeSongId
  this.config.bootBehavior = fileData.config.bootBehavior
  this.config.networkDevices = fileData.config.networkDevices
  
  this.patterns = fileData.patterns
  this.playlists = fileData.playlists
  this.songs = fileData.songs
  this.pins = fileData.pins
  
  this.initializeSequencer()
  this.loadPattern(this.config.activePatternId)
  this.loadSong(this.config.activeSongId)
  this.loadPlaylist(this.config.activePlaylistId)  
}

function saveToDisk (fileName) {
  const o = {
    config: { 
      activePatternId: this.config.activePatternId,
      activePlaylistId: this.config.activePlaylistId,
      activeSongId: this.config.activeSongId,
      bootBehavior: this.config.bootBehavior,
      networkDevices: this.config.networkDevices
    },
    patterns: this.patterns,
    playlists: this.playlists,
    songs: this.songs,
    pins: this.pins
  }

  fs.writeFileSync('./data/state-machine.json', JSON.stringify(o,null,2))
}

