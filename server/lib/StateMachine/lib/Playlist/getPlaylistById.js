module.exports = function getPlaylistById (id) {
  return this.playlists.filter(o=>o.id === id)[0]
}