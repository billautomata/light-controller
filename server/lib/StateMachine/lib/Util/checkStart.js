module.exports = function checkStart () {
  if (this.config.bootBehavior.startOnBoot) {
    this.loadPlaylist(this.config.bootBehavior.bootPlaylistId)
    this.startSequencer({ mode: 'playlist' })
  }
}