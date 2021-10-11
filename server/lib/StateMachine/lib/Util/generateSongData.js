module.exports = function generateSongData (id) {
  const patterns = []
  let steps = []
  const song = id === this.config.activeSongId ? this.config.activeSong : this.getSongById(id)
  song.steps.forEach(step => {
    const data = this.generatePatternData(step.id)
    data.patternData.msLength = data.patternData.msLength / step.speed
    data.steps.forEach(patternStep=>{ patternStep[0] = patternStep[0] / step.speed })
    for (let i = 0; i < step.repeat; i++) {
      patterns.push(data.patternData)
      steps = steps.concat(data.steps)
    }
  })
  const songLength = patterns.reduce((a,b)=>a+b.patternLength,0)
  return { patterns, steps, songLength }
}