module.exports = function loadPlaylist (id) {
  this.config.activePlaylistId = id
  this.config.activePlaylist = JSON.parse(JSON.stringify(this.getPlaylistById(id)))
}