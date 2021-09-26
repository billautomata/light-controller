module.exports = function deleteSong (id) {
  this.songs = this.songs.filter(o=>o.id !== id)
}