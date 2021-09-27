module.exports = function loadPattern (id) {
  this.config.activePatternId = id
  console.log(this.patterns)
  console.log('pattern', this.getPatternById(id))
  this.config.activePattern = JSON.parse(JSON.stringify(this.getPatternById(id)))
}