module.exports = function savePattern () {
  const idx = this.patterns.findIndex(o=>o.id === this.config.activePatternId)
  this.patterns[idx] = JSON.parse(JSON.stringify(this.config.activePattern))
  this.config.patternData = this.generatePatternData(this.config.activePatternId)
  this.config.songData = this.generateSongData(this.config.activeSongId)
  this.config.playlistData = this.generatePlaylistData(this.config.activePlaylistId)
}