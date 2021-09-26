const createPlaylist = require('./createPlaylist.js')
const deletePlaylist = require('./deletePlaylist.js')
const getPlaylists = require('./getPlaylists.js')
const getPlaylistById = require('./getPlaylistById.js')
const getPlaylistIndex = require('./getPlaylistIndex.js')
const loadPlaylist = require('./loadPlaylist.js')

module.exports = function registerPlaylistFns (s) {
  s.createPlaylist = createPlaylist.bind(s)
  s.deletePlaylist = deletePlaylist.bind(s)
  s.getPlaylists = getPlaylists.bind(s)
  s.getPlaylistById = getPlaylistById.bind(s)
  s.getPlaylistIndex = getPlaylistIndex.bind(s)
  s.loadPlaylist = loadPlaylist.bind(s)
}
