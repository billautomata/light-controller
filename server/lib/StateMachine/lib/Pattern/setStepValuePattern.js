module.exports = function setStepValuePattern (payload) {
  // payload = { channel, step, value }
  if (payload.value === 1 && 
      this.config.activePattern
        .channels[channel+1]
        .steps.findIndex(o=>o.idx === payload.idx) === -1) 
  {
    this.config.activePattern.channels[channel+1].steps.push({ idx: payload.idx, value: 1 })
  } else {
    this.config.activePattern.channels[channel+1].steps =
      this.config.activePattern.channels[channel+1].steps.filter(o=>{o.idx !== payload.idx})
  }
}