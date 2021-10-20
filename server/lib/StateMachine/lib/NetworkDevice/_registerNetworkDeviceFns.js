const createNetworkDevice = require('./createNetworkDevice.js')
const getNetworkDevices = require('./getNetworkDevices.js')
const heartbeatNetworkDevice = require('./heartbeatNetworkDevice.js')
const testNetworkDevice = require('./testNetworkDevice.js')
const updateNetworkDevice = require('./updateNetworkDevice.js')

module.exports = function registerNetworkDeviceFns (s) {
  s.createNetworkDevice = createNetworkDevice.bind(s)
  s.getNetworkDevices = getNetworkDevices.bind(s)
  s.heartbeatNetworkDevice = heartbeatNetworkDevice.bind(s)
  s.testNetworkDevice = testNetworkDevice.bind(s)
  s.updateNetworkDevice = updateNetworkDevice.bind(s)
}