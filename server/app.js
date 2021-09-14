const createStateMachine = require('./lib/StateMachine.js')
const socketRoutes = require('./lib/socketRoutes.js')
var restify = require('restify')

const server = restify.createServer({
  name: 'crosstown-trees',
  version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params)
  return next()
})

const f = server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
})

const io = require("socket.io")({
  // path: "/socket.io",
  // serveClient: true,
})

// either
const socketServer = require("http").createServer()

const sockets = {}

const stateMachine = createStateMachine()
stateMachine.registerSockets(sockets)

io.attach(f, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

let pulse = {}
let currentStep = 0
let currentSpeed = 300
let currentPattern = 0

const patterns = [
  { 
    id: '0',
    name: 'Basic Pattern',
    patternLength: 10,
    patternStart: 0,
    patternEnd: 10,
    channels: [
      { 
        id: 'TIME_CHANNEL',
        name: 'TIME_CHANNEL', 
        steps: [
          { value: 500 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: 50 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 }
        ]
      },
      { 
        id: 0,
        name: 'Center Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ]
      },
      { 
        id: 1,
        name: '2nd Floor Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ]
      }      
    ]
  },
  { 
    id: '4',
    name: 'Longer Pattern',
    patternLength: 20,
    patternStart: 0,
    patternEnd: 20,
    channels: [
      { 
        id: 'TIME_CHANNEL',
        name: 'TIME_CHANNEL', 
        steps: [
          { value: 500 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: 50 },
          { value: -1 },
          { value: -1 },
          { value: -1 },
          { value: -1 }
        ]
      },
      { 
        id: 0,
        name: 'Center Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },          
        ]
      },
      { 
        id: 1,
        name: '2nd Floor Tree', 
        steps: [
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 1 },
          { value: 1 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 1 }, 
        ]
      }      
    ]
  }  
]

// function doPulse (socket) {
//   clearTimeout(pulse)
//   pulse = setTimeout(()=>{
//     currentStep += 1
//     currentStep = currentStep % patterns[currentPattern].patternLength
//     // console.log('current step', currentStep)
//     if (patterns[currentPattern].channels[0].steps[currentStep].value !== -1) {
//       currentSpeed = patterns[currentPattern].channels[0].steps[currentStep].value
//       // console.log('setting current speed to', currentSpeed)
//     } else {
//       // go back and find the previous step speed
//       let matchFound = false
//       let checkStep = currentStep
//       while(matchFound === false) {
//         if(checkStep < 0) {
//           checkStep = patterns[currentPattern].patternLength + checkStep
//         }
//         if(patterns[currentPattern].channels[0].steps[checkStep].value !== -1) {
//           matchFound = true
//           currentSpeed = patterns[currentPattern].channels[0].steps[checkStep].value
//           // console.log('setting current speed to', currentSpeed, currentStep, checkStep, patterns[currentPattern].channels[0].steps[checkStep])
//         }
//         checkStep -= 1
//       }
//     }
//     socket.send('step', { step: currentStep })
//     doPulse(socket)
//   }, currentSpeed)
// }

io.on('connection', (socket)=>{
  console.log('socket-id', socket.id)
  sockets[socket.id] = socket

  stateMachine.onConnect(socket.id)

  socket.on('disconnect', ()=>{
    console.log('disconnect', socket.id)
    sockets[socket.id] === null
  })

  socketRoutes(socket, stateMachine)

  return

  socket.on('TIME_VALUE', payload => {
    console.log(payload, Number(payload.value))
    if(Number(payload.value) === 0) {
      patterns[currentPattern].channels[0].steps[payload.step].value = -1
    } else {
      patterns[currentPattern].channels[0].steps[payload.step].value = Number(payload.value)
    }    
  })

  socket.on('PATTERN_VALUE', payload => {
    console.log('pattern value', payload)
    patterns[currentPattern].channels[payload.channel].steps[payload.step] = { value: payload.value }
    socket.send('patterns', { value: patterns })
  })

  socket.on('SET_TIME_VALUE', payload => {
    console.log('setting time value', payload)
    patterns[currentPattern].channels[0].steps[payload.step].value = payload.value
  })

  socket.on('SET_CURRENT_STEP', payload => {
    currentStep = payload.value
    socket.send('step', { step: currentStep })
  })

  socket.on('SET_NUMBER_OF_CHANNELS', payload => {
    payload.value = Number(payload.value)
    console.log('set number of channels called', payload)
    if(payload.value + 1 === patterns[currentPattern].channels.length) {
      console.log('payload value matches, doing nothing')
        // do nothing
      return 
    } else if(payload.value + 1 < patterns[currentPattern].channels.length) {
      console.log('reducing the number of channels')
      patterns[currentPattern].channels.length = payload.value + 1
    } else if(payload.value + 1 > patterns[currentPattern].channels.length) {      
      const nBaseChannels = patterns[currentPattern].channels.length
      const nChannelsToAdd = payload.value - nBaseChannels + 1
      console.log('adding to the number of channels', nChannelsToAdd)
      for(let i = 0; i < nChannelsToAdd; i++) {
        console.log('adding channel')
        patterns[currentPattern].channels.push({
          id: patterns[currentPattern].channels.length + 1,
          name: 'new channel',
          steps: new Array(patterns[currentPattern].patternLength).fill({ value: 0 })
        })
      }
    }
    socket.send('patterns', { value: patterns })
  })

  socket.on('SET_NUMBER_OF_STEPS', payload => {
    payload.value = Number(payload.value)
    console.log('setting number of steps', payload)
    const current = patterns[currentPattern]
    console.log(current.patternLength)
    if (current.patternLength === payload.value) {
      // do nothing
      console.log('payload value matches pattern length, doing nothing')
      return
    } else if (current.patternLength < payload.value) {
      console.log('payload value is greater than current length')      
      const delta = payload.value - current.patternLength
      current.patternLength = payload.value
      current.channels.forEach((channel,channelIdx)=>{
        for(let i = 0; i < delta; i++) {
          if(channelIdx === 0) {
            channel.steps.push({ value: -1 })
          } else {
            channel.steps.push({ value: 0 })
          }
        }
      })
    } else if (current.patternLength > payload.value) {
      currentStep = 0
      current.patternLength = payload.value
      console.log('payload value is less than current length')
      current.channels.forEach(channel=>{
        channel.steps.length = payload.value
      })
    }
    socket.send('patterns', { value: patterns })
  })

})

// socketServer.listen(9001, ()=>{
//   console.log('socket server listening on 9001')
// })