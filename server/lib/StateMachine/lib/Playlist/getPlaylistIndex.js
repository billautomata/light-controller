module.exports = function getPlaylistIndex (id) {
  return this.playlists.findIndex(o=>o.id === id)
}