module.exports = function deleteStepPlaylist (payload) {
  this.config.activePlaylist.steps = this.config.activePlaylist.steps.filter((o,i)=>i!==payload.idx)
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}