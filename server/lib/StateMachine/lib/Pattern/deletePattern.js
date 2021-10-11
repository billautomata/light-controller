module.exports = function deletePattern (id) {
  this.patterns = this.patterns.filter(o=>o.id !== id)
}