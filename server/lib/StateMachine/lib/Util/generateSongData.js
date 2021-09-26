module.exports = function generateSongData (id) {
  const patterns = []
  const steps = []

  const song = this.getSongById(id)

  song.steps.forEach(step => {
    const data = this.generatePatternData(step.id)
    data.patternData.msLength = data.patternData.msLength / step.speed
    data.steps.forEach(patternStep=>{ patternStep[0] = patternStep[0] / step.speed })
    for (let i = 0; i < step.repeat; i++) {
      patterns.push(data.patternData)
      steps.concat(data.steps)
    }
  })

  return { patterns, steps }
}