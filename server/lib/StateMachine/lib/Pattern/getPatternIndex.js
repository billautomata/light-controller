module.exports = function getPatternIndex (id) {
  return this.patterns.findIndex(o=>o.id === id)
}