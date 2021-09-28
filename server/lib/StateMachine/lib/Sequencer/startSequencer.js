module.exports = function startSequencer (payload) {
  // payload = { mode }
  this.sequencer.isPlaying = true
  this.sequencer.currentStep = -1
  this.sequencer.playingMode = payload.mode 
  this.sequencer.sequenceStarted_ms = Date.now()
  this.sequencer.nextActionTime = -1
  this.tickSequencer()
}