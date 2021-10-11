module.exports = function StateMachine () {
  this.config = {}
  this.networkDevices = []
  this.patterns = []
  this.pins = [7,11,13,15,29,31,33,35,12,16,18,22,26,32,36,38]
  this.playlists = []
  this.pulseTimeout = {}
  this.sequencer = {}
  this.sockets = {}
  this.songs = []  

  return this
}