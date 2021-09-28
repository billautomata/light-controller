module.exports = function saveSong () {
  const idx = this.songs.findIndex(o=>o.id === this.config.activeSongId)
  this.songs[idx] = JSON.parse(JSON.stringify(this.config.activeSong))
}