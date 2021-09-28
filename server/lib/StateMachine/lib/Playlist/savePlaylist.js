module.exports = function savePlaylist () {
  const idx = this.playlists.findIndex(o=>o.id === this.config.activePlaylistId)
  this.playlists[idx] = JSON.parse(JSON.stringify(this.config.activePlaylist))
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}