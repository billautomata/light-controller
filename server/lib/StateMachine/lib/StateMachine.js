module.exports = function StateMachine () {

  this.config = {}
  this.patterns = []
  this.playlists = []
  this.pulseTimeout = {}
  this.sequencer = {}
  this.sockets = {}
  this.songs = []

  return this

}