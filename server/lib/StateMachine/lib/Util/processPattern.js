module.exports = function processPattern () {
    this.sequencer.currentStep += 1
    this.sequencer.currentStep = this.sequencer.currentStep % this.config.activePattern.patternLength

    const timeValue = this.config.activePattern.channels[0].steps.filter(o=>o.idx === this.sequencer.currentStep)[0]
    if(timeValue !== undefined) {
      this.sequencer.currentSpeed = timeValue.value
    } 

    this.sequencer.nextActionTime = Date.now() + this.sequencer.currentSpeed

    const channelValues = this.config.activePattern.channels
      .filter((o,i)=>i>0)
      .map(o=>{ return o.steps.filter(o=>o.idx === this.sequencer.currentStep)[0] === undefined ? 0 : o.steps.filter(o=>o.idx === this.sequencer.currentStep)[0].value })

    console.log(['current step', sequencer.currentStep, channelValues.toString()].join('\t'))

    this.sendMessage('set-step', { value: sequencer.currentStep })
    this.writePins(channelValues)

}