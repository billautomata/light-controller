module.exports = function generatePlaylistData (id) {
  const songs = []
  let steps = []
  const playlist = this.getPlaylistById(id)
  playlist.steps.forEach(step => {
    const d = generateSongData(step.id)
    d.patterns.forEach(pattern=>{ pattern.msLength = pattern.msLength / step.speed })
    const sum = d.patterns.reduce((a,b)=>a+=b.msLength, 0)
    d.steps.forEach(step=>{ step[0] = step[0] / step.speed })
    for (let i = 0; i < step.repeat; i++) {
      songs.push({ msLength: sum, id: step.id})
      steps = steps.concat(d.steps)
    }
  })
  return { songs, steps }
}