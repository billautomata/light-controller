const { v4: uuid } = require('uuid')

module.exports = function createPattern () {
  const defaultPattern = {
    name: 'New Pattern (' + this.patterns.length + ')',
    id: uuid(),
    patternLength: 16,
    channels: [
      { id: 'time-channel', name: 'time-channel', steps: [{ idx:0, value: 500 }]},        
    ].concat(new Array(16).fill(0).map((o,i)=>{
      return {
        id: 'channel-'+i,
        name: 'Channel '+i,
        steps: [ {idx: i, value: 1 } ]
      }
    }))
  }
  this.patterns.push(defaultPattern)
}