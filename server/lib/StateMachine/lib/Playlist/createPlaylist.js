const { v4: uuid } = require('uuid')

module.exports = function createPlaylist () {
  const defaultPlaylist = {
    name: 'New Playlist (' + this.playlists.length + ')',
    id: uuid(),
    steps: []
  }
  this.playlists.push(defaultPlaylist)
  return defaultPlaylist
}