module.exports = function addStepSong () {
  if (this.config.activeSong.steps.length === 0) {
    this.config.activeSong.steps.push({ id: this.config.activePatternId, repeat: 1, speed: 1 })
  } else {
    this.config.activeSong.steps.push({ id: this.config.activeSong.steps[0].id, repeat: 1, speed: 1 })
  }  
  this.config.songData = this.generateSongData(this.config.activeSongId)
  return this.config.activeSong.steps[this.config.activeSong.steps.length-1]
}