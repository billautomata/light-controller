module.exports = function bootConfig (payload) {
  switch (payload.type) {
    case 'SET_START_ON_BOOT':
      this.config.bootBehavior.startOnBoot = payload.value
      break;
    case 'SET_BOOT_PLAYLIST':
      this.config.bootBehavior.bootPlaylistId = payload.value
      break;
  }
}