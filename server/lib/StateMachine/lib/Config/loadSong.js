module.exports = function loadSong (id) {
  this.config.activeSongId = id
  this.config.activeSong = JSON.parse(JSON.stringify(this.getSongById(id)))
  this.config.songData = this.generateSongData(id)
}