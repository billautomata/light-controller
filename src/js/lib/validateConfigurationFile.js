export default function validateConfigurationFile (result) {

  let t = null

  try {
    t = JSON.parse(result)
  } catch (error) {
    console.log(error)
    return
  }

  const fields = [
    { key: 'config.activePatternId', type: 'string' },
    { key: 'config.activePlaylistId', type: 'string' },
    { key: 'config.activeSongId', type: 'string' },
    { key: 'config.bootBehavior', type: 'object' },
    { key: 'config.networkDevices', type: 'object' },
    { key: 'patterns', type: 'object' },
    { key: 'playlists', type: 'object' },
    { key: 'songs', type: 'object' },
    { key: 'pins', type: 'object' },
  ]  

  const validated = []
  fields.forEach(field=>{
    if(field.key.split('.').length > 1) {
      const left = field.key.split('.')[0]
      const right = field.key.split('.')[1]
      if(typeof(t[left][right]) === field.type) {
        validated.push({ key: field.key, validated: true })
      } else {
        validated.push({ key: field.key, validated: false })
      }
    } else {
      if(typeof(t[field.key]) === field.type) {
        validated.push({ key: field.key, validated: true })
      } else {
        validated.push({ key: field.key, validated: false })
      }
    }    
  })

  console.log(validated)
  console.log(t)
  window.socket.emit('LOAD_CONFIGURATION_FROM_JSON', t)
}