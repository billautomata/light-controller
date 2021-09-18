const fs = require('fs')

const lines = fs.readFileSync('./file.dat', 'utf-8').split('\n')
console.log('High res fft file length', lines.length)

const nChannels = 2048

const channelArrays = {}

for(let i = 0; i < nChannels; i++) {
  channelArrays[i] = {}
}

let beginLine = 0
let endLine = -1

lines.forEach((line,lineIndex)=>{
  if(String(line).indexOf('Samples') === 0) {
    endLine = lineIndex
    console.log(lineIndex, 'samples index starts here')
  }
})

let leap = 2048

for(let i = beginLine; i < endLine; i+=leap) {
  // console.log(lines[i].split(' ')[2])
  for(let j = 0; j < leap; j++) {
    channelArrays[j][Math.floor(i/leap)] = Number(lines[i].split(' ')[2])
  }
}

reduce(channelArrays)

// reduce arrays

function reduce (channels) {
  const leap = 2048
  const reduction = 256
  const nChannels = Math.floor(leap / reduction)

  const newChannels = new Array(nChannels).fill(0).map((o,i)=>{ return []})

  let currentLine = 0
  let currentChannel = 0
  while(currentLine < endLine) {
    let sum = 0
    for(let i = 0; i < reduction; i++) {
      const v = Number(lines[currentLine].split(' ')[2])
      // console.log(v)
      sum += v
      currentLine += 1
    }
    // console.log('sum before', sum)
    sum = sum / reduction
    // console.log('sum after', sum)
    newChannels[currentChannel].push(sum)
    currentChannel += 1
    currentChannel = currentChannel % nChannels
  }

  // console.log('new channels', newChannels[0].join(' '))
  console.log('length', newChannels[0].length)
  console.log('length seconds per sample', 465.293061 / newChannels[0].length)
  fs.writeFileSync('./reducedData.json', JSON.stringify(newChannels))
}