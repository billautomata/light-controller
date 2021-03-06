let pulseTimeout = {}

module.exports = function tickSequencer () {
  clearTimeout(pulseTimeout)
  if (this.sequencer.isPlaying === false) {
    return
  }

  if (Date.now() > this.sequencer.nextActionTime) {
    switch (this.sequencer.playingMode) {
      case 'pattern':
        this.processPattern()
        break;
      case 'song':
        this.processSong()
        break;
      case 'playlist':
        this.processPlaylist()
        break;
    }
  }

  if (this.sequencer.isPlaying) {
    pulseTimeout = setTimeout(()=>{this.tickSequencer()}, 0)
  }
}