module.exports = function setStepTimePattern (payload) {
  // payload = { step, value }
  if (value === 0) {
    // erase the step 
    this.config.activePattern.channels[0].steps = 
      this.config.activePattern.channels[0].steps.filter(o=>o.idx !== step)
  } else {
    // does it already exist?
    const index = this.config.activePattern.channels[0].steps.findIndex(o=>o.idx === step)
    if(index !== -1) {
      this.config.activePattern.channels[0].steps[index].value = value
    } else {
      this.config.activePattern.channels[0].steps.push({ idx: step, value })
    }
  }
}