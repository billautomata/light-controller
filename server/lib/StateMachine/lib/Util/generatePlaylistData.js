module.exports = function generateSongData (id) {
  const patterns = []
  const steps = []

  const song =  this.getSongById(id)

  song.steps.forEach(step => {
    for (let i = 0; i < step.repeat; i++) {

    }
  })

  return { patterns, steps }
}