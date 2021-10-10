module.exports = function updateNetworkDevice (options) {
  const index = this.config.networkDevices.findIndex(o=>o.mac === options.mac)
  this.config.networkDevices[index].mappings = options.mappings
}