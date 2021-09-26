module.exports = function generatePatternData (id) {
  const patternData = {}
  const steps = []
  const pattern = this.getPatternById(id)
  for (let i = 0; i < pattern.patternLength; i++) {
    steps.push(pattern.channels.map(channel=>{
      const matchingStep = channel.steps.filter(o=>o.idx===i)[0]
      if(matchingStep !== undefined) {
        return matchingStep.value
      } else {
        return 0
      }
    }))
  }
  let currentSpeed = 0
  let sum = 0
  steps.forEach(step=>{
    if (step[0] !== 0) {
      currentSpeed = step[0]
    }
    sum += currentSpeed
  })

  patternData.msLength = sum
  patternData.id = id

  return { patternData, steps }
}