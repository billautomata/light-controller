module.exports = function createNetworkDevice (mac) {
  const index = this.config.networkDevices.findIndex(o=>o.mac === mac)
  if(index === -1) {
    this.config.networkDevices.push({
      mac,
      mappings: [],
      name: `Network Device (${this.config.networkDevices.length})`
    })
  }
}