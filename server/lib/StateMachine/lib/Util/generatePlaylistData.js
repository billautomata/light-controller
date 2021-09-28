module.exports = function generatePlaylistData (id) {
  const songs = []
  let steps = []
  const playlist = id === this.config.activePlaylistId ? this.config.activePlaylist : this.getPlaylistById(id)
  playlist.steps.forEach(step => {
    const d = generateSongData(step.id)
    d.patterns.forEach(pattern=>{ pattern.msLength = pattern.msLength / step.speed })
    const sum = d.patterns.reduce((a,b)=>a+=b.msLength, 0)
    d.steps.forEach(_step=>{ _step[0] = _step[0] / step.speed })
    for (let i = 0; i < step.repeat; i++) {
      songs.push({ msLength: sum, id: step.id, songLength: d.songLength })
      steps = steps.concat(d.steps)
    }
  })
  const playlistLength = songs.reduce((a,b)=>a+b.songLength,0)
  return { songs, steps, playlistLength }
}