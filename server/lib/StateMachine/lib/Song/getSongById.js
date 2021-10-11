module.exports = function getSongById (id) {
  return this.songs.filter(o=>o.id === id)[0]
}