module.exports = function deleteStepSong (payload) {
  this.config.activeSong.steps = this.config.activeSong.steps.filter((o,i)=>i!==payload.idx)
  this.config.songData = this.generateSongData(this.config.activeSongId)
}