module.exports = function testNetworkDevice (payload) {
  console.log(payload)
  this.emitZMQ('test', payload)
}