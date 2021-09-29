module.exports = function deletePlaylist (id) {
  this.playlists = this.playlists.filter(o=>o.id !== id)
}