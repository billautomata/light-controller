const createNetworkDevice = require('./createNetworkDevice.js')
const getNetworkDevices = require('./getNetworkDevices.js')
const updateNetworkDevice = require('./updateNetworkDevice.js')

module.exports = function registerNetworkDeviceFns (s) {
  s.createNetworkDevice = createNetworkDevice.bind(s)
  s.getNetworkDevices = getNetworkDevices.bind(s)
  s.updateNetworkDevice = updateNetworkDevice.bind(s)
}