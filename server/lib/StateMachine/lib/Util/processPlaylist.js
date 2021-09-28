module.exports = function processPlaylist () {
  this.sequencer.currentStep += 1
  this.sequencer.currentStep = this.sequencer.currentStep % this.config.playlistData.playlistLength

  if (this.sequencer.currentStep === 0) {
    sequencer.sequenceStarted_ms = Date.now()
  }


  console.log(['playlist current step',this.sequencer.currentStep,this.config.playlistData.steps[this.sequencer.currentStep].join(',')].join('\t'))

  const timeValue = this.config.playlistData.steps[this.sequencer.currentStep][0]
  if (timeValue !== 0) {
    this.sequencer.currentSpeed = timeValue
  }

  this.sequencer.nextActionTime = Date.now() + this.sequencer.currentSpeed

  const sum = this.config.playlistData.songs.map(o=>o.msLength).reduce((a,b)=>a+b)
  const percentElapsed = (Date.now() - this.sequencer.sequenceStarted_ms) / sum

  this.sendMessage('set-step', { value: this.sequencer.currentStep })
  this.sendMessage('set-step-time', { value: percentElapsed })

  this.writePins(this.config.playlistData.steps[this.sequencer.currentStep].slice(1))

}