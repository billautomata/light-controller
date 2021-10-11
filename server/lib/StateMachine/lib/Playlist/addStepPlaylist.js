module.exports = function addStepPlaylist () {
  if (this.config.activePlaylist.steps.length === 0) {
    this.config.activePlaylist.steps.push({ id: this.config.activeSongId, repeat: 1, speed: 1 })
  } else {
    this.config.activePlaylist.steps.push({ id: this.config.activePlaylist.steps[0].id, repeat: 1, speed: 1 })
  }  
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
  return this.config.activePlaylist.steps[this.config.activePlaylist.steps.length-1]
}