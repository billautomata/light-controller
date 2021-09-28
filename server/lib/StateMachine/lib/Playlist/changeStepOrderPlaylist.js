module.exports = function changeStepOrderPlaylist (payload) {
  console.log('changing song step order', payload)
  console.log(this.config.activePlaylist.steps)
  if (payload.idx === 0 && payload.direciton === 'up') {
    return
  } else if (payload.idx === this.config.activePlaylist.steps.length - 1 && payload.direction === 'down') {
    return
  }
  let a = this.config.activePlaylist.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)]
  this.config.activePlaylist.steps[Number(payload.idx) + (payload.direction === 'up' ? -1 : 1)] = JSON.parse(JSON.stringify(this.config.activePlaylist.steps[Number(payload.idx)]))
  this.config.activePlaylist.steps[Number(payload.idx)] = JSON.parse(JSON.stringify(a))
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}