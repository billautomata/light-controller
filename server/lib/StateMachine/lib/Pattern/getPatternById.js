module.exports = function getPatternById (id) {
  return this.patterns.filter(o=>o.id === id)[0]
}