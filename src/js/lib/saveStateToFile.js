import { saveAs } from 'file-saver'

export default function saveStateToFile (state) {
  const o = { config: {} }

  o.config.activePatternId = state.config.activePatternId
  o.config.activePlaylistId = state.config.activePlaylistId
  o.config.activeSongId = state.config.activeSongId
  o.config.bootBehavior = state.config.bootBehavior
  o.config.networkDevices = state.config.networkDevices
  
  o.patterns = state.patterns
  o.playlists = state.playlists
  o.songs = state.songs
  o.pins = state.pins

  const b = new Blob([JSON.stringify(o,null,2)], { type: 'text/plain;charset=utf-8' })
  saveAs(b, 'configuration.json')
}