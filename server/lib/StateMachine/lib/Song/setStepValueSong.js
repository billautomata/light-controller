module.exports = function setStepValueSong (payload) {
  switch(payload.type) {
    case 'pattern':
      this.config.activeSong.steps[payload.idx].id = payload.value
      break;
    case 'repeat':
      this.config.activeSong.steps[payload.idx].repeat = Number(payload.value)
      break;
    case 'speed':
      this.config.activeSong.steps[payload.idx].speed = Number(payload.value)
      break;
    default:
      break;
  }  
  this.config.songData = this.generateSongData(this.config.activeSongId)
}