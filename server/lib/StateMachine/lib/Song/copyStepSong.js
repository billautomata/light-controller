module.exports = function copyStepSong (payload) {
  const stepToCopy = this.config.activeSong.steps[payload.idx]
  this.config.activeSong.steps.push(JSON.parse(JSON.stringify(stepToCopy)))
  this.config.songData = this.generateSongData(this.config.activeSongId)
}