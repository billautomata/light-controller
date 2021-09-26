const createPattern = require('./createPattern.js')
const deletePattern = require('./deletePattern.js')
const getPatternById = require('./getPatternById.js')
const getPatternIndex = require('./getPatternIndex.js')
const getPatterns = require('./getPatterns.js')
const loadPattern = require('./loadPattern.js')
const setStepValuePattern = require('./setStepValuePattern.js')

module.exports = function registerPatternFns (s) {
  s.createPattern = createPattern.bind(s)
  s.deletePattern = deletePattern.bind(s)
  s.getPatternById = getPatternById.bind(s)
  s.getPatternIndex = getPatternIndex.bind(s)
  s.getPatterns = getPatterns.bind(s)
  s.loadPattern = loadPattern.bind(s)
  s.setStepValuePattern = setStepValuePattern.bind(s)
}