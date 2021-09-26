module.exports = function initializeSequencer () {
  this.sequencer.currentStep = -1
  this.sequencer.currentSpeed = 300
  this.sequencer.isPlaying = false
  this.sequencer.nextActionTime = 0
  this.sequencer.playingMode = 'pattern'
  this.sequencer.sequenceStarted_ms = -1  
}