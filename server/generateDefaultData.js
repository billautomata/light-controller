const fs = require('fs')
const { v4: uuid } = require('uuid')

const uuidPattern = uuid()
const uuidPattern2 = uuid()
const uuidSong = uuid()
const uuidSong2 = uuid()
const uuidPlaylist = uuid()

const output = {
  config: {
    uiMode: 'pattern',
    isPlaying: false,
    activePattern: {},
    activePatternId: uuidPattern,
    activeSong: {},
    activeSongId: uuidSong,
    activePlaylist: {},
    activePlaylistId: uuidPlaylist,    
  },
  patterns: [
    {
      name: 'Basic Pattern',
      id: uuidPattern,
      patternLength: 12,
      channels: [
        { name: 'time-channel', id: 'time-channel', steps: [{idx: 0, value: 500}] },        
      ].concat(new Array(16).fill(0).map((n,i)=> {         
        return { name: 'channel-'+i, id: i, steps: [{idx:5, value: 1}]}
      }))
    },
    {
      name: 'Longer Pattern',
      id: uuidPattern2,
      patternLength: 32,
      channels: [
        { name: 'time-channel', id: 'time-channel', steps: [{idx: 0, value: 500}] },        
      ].concat(new Array(16).fill(0).map((n,i)=> {         
        return { name: 'channel-'+i, id: i, steps: [{idx:5, value: 1}]}
      }))
    }    
  ],
  songs: [
    {
      name: 'Basic Song',
      id: uuidSong,
      steps: [
        { id: uuidPattern, repeat: 1, speed: 1 },
        { id: uuidPattern2, repeat: 1, speed: 1 },
      ]
    },
    {
      name: 'Other Song',
      id: uuidSong2,
      steps: [
        { id: uuidPattern2, repeat: 1, speed: 1 },
        { id: uuidPattern, repeat: 1, speed: 1 },
      ]
    }    
  ],
  playlists: [
    {
      name: 'Playlist',
      id: uuidPlaylist,
      steps: [
        { id: uuidSong, repeat: 1, speed: 1 },
        { id: uuidSong2, repeat: 1, speed: 1 },
      ]
    }
  ]
}

console.log(output)

fs.writeFileSync('./stateMachineData.json', JSON.stringify(output,null,2))