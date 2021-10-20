module.exports = function setupPattern (socket, stateMachine) {
  socket.on('SET_BOOT_PLAYLIST', (payload) => {
    console.log('setting boot playlist', payload)
    stateMachine.bootConfig({ type: 'SET_BOOT_PLAYLIST', value: payload })
    socket.emit('config', stateMachine.config)
  })
 
  socket.on('SET_START_ON_BOOT', (payload) => {
    console.log('setting start on boot', payload)
    stateMachine.bootConfig({ type: 'SET_START_ON_BOOT', value: payload })
    socket.emit('config', stateMachine.config)
  })

  socket.on('TEST_NETWORK_DEVICE', payload => {
    stateMachine.testNetworkDevice(payload)
  })
}