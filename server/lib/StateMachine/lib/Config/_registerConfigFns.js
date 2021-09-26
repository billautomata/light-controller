const getConfig = require('./getConfig.js')

module.exports = function registerConfigFns (s) {
  s.getConfig = getConfig.bind(s)
}