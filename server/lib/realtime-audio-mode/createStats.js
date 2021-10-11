const async = require('async')
const { Buffer } = require('buffer')
const fs = require('fs')
const { exec, spawn } = require('child_process')

const fileName = 'output.wav'
const path = '~/Desktop/'

const fns = []

const songStats = {
  fileName,
  path,
  length: -1,
  nChannels: 8,
  fftBuckets: {}
}

// find length of song in seconds
fns.push(done=>{
  const child = spawn('sox', [path+fileName,'-n','stat'])
  let statOutput = Buffer.alloc(0)
  child.stderr.on('data', data=>{
    statOutput = Buffer.concat([statOutput, data], statOutput.length + data.length)
  })
  child.on('exit', ()=>{
    console.log('exit\n', statOutput.toString().split('\n'))
    // console.log(statOutput.toString().split('\n').filter(o=>o.indexOf('Length (seconds)') === 0)[0].split(' ').pop())
    songStats.length = Number(statOutput.toString().split('\n').filter(o=>o.indexOf('Length (seconds)') === 0)[0].split(' ').pop())        
    console.log(songStats)
    done()
  })    
})

// generate file.dat stats

fns.push(done=>{
  console.log('Creating the high-res FFT, this will take a minute...')
  exec(['sox',path+fileName,'-n stat -freq >& file.dat'].join(' '),
    (err,stdout,stderr)=>{
      if (err) {
        console.log('error!!', err)
      }
      console.log('...done creating the high res fft.')
      done()  
  })
})

fns.push(done=>{
  console.log('Reducing the high-res FFT into 8 channels...')
  exec(['node', 'processFileDat.js'].join(' '),
    (err,stdout,stderr)=>{
      if(err) {
        console.log('error!!', err)
      }
      console.log(stdout)
      console.log('Done reducing the file')
      songStats.fftBuckets = JSON.parse(fs.readFileSync('./reducedData.json').toString())
      fs.writeFileSync('./songStats.json', JSON.stringify(songStats))
      console.log('Done writing stats to disk')
  })
})



async.series(fns)