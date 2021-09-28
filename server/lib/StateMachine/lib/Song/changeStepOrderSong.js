module.exports = function changeStepOrderSong (payload) {
  console.log('changing song step order', payload)
  console.log(this.config.activeSong.steps)
  if (payload.idx === 0 && payload.direciton === 'up') {
    return
  } else if (payload.idx === this.config.activeSong.steps.length - 1 && payload.direction === 'down') {
    return
  }
  let a = this.config.activeSong.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)]
  this.config.activeSong.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)] = JSON.parse(JSON.stringify(this.config.activeSong.steps[Number(payload.idx)]))
  this.config.activeSong.steps[Number(payload.idx)] = JSON.parse(JSON.stringify(a))
  this.config.songData = this.generateSongData(this.config.activeSongId)
}