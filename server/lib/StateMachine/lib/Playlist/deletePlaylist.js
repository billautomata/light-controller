module.exports = function deletePlaylist (id) {
  this.playlists = this.songs.filter(o=>o.id !== id)
}