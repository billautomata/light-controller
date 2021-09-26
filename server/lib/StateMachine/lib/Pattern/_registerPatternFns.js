const createPattern = require('./createPattern.js')
const deletePattern = require('./deletePattern.js')
const getPatternById = require('./getPatternById.js')
const getPatternIndex = require('./getPatternIndex.js')
const getPatterns = require('./getPatterns.js')
const loadPattern = require('./loadPattern.js')

module.exports = function registerPatternFns (s) {
  s.createPattern = createPattern.bind(this)
  s.deletePattern = deletePattern.bind(this)
  s.getPatternById = getPatternById.bind(this)
  s.getPatternIndex = getPatternIndex.bind(this)
  s.getPatterns = getPatterns.bind(this)
  s.loadPattern = loadPattern.bind(this)
}