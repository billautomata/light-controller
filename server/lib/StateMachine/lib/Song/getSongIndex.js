module.exports = function getSongIndex (id) {
  return this.songs.findIndex(o=>o.id === id)
}