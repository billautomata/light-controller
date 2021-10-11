module.exports = function copyStepPlaylist (payload) {
  const stepToCopy = this.config.activePlaylist.steps[payload.idx]
  this.config.activePlaylist.steps.push(JSON.parse(JSON.stringify(stepToCopy)))
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}