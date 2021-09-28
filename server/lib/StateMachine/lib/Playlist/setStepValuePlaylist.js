module.exports = function setStepValuePlaylist (payload) {
  switch(payload.type) {
    case 'song':
      this.config.activePlaylist.steps[payload.idx].id = payload.value
      break;
    case 'repeat':
      this.config.activePlaylist.steps[payload.idx].repeat = Number(payload.value)
      break;
    case 'speed':
      this.config.activePlaylist.steps[payload.idx].speed = Number(payload.value)
      break;
    default:
      break;
  }  
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}