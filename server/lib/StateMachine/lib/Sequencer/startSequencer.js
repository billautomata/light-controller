module.exports = function startSequencer (payload) {
  // payload = { mode }
  this.sequencer.isPlaying = true
  this.sequencer.playingMode = payload.mode 
  this.sequencer.sequenceStarted_ms = Date.now()
  this.sequencer.tickSequencer()
}