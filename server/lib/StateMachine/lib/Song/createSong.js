const { v4: uuid } = require('uuid')

module.exports = function createSong () {
  const defaultSong = {
    name: 'New Song (' + this.songs.length + ')',
    id: uuid(),
    steps: []
  }
  this.songs.push(defaultSong)
  return defaultSong
}