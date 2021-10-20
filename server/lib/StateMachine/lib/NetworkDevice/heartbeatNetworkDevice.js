module.exports = function heartbeatNetworkDevice (mac) {
  const index = this.config.networkDevices.findIndex(o=>o.mac === mac)
  if(index !== -1) {
    this.config.networkDevices[index].lastSeen = Date.now()
  }
}