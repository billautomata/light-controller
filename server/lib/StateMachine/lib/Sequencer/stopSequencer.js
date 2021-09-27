module.exports = function stopSequencer (payload) {
  // payload = { mode }
  this.sequencer.isPlaying = false
  this.sequencer.currentStep = -1
  this.sequencer.currentTime = 0
}