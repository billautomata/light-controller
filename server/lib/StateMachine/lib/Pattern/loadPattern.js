module.exports = function loadPattern (id) {
  this.config.activePatternId = id
  this.config.activePattern = JSON.parse(JSON.stringify(this.getPatternById(id)))
}