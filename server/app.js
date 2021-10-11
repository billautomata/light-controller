require('dotenv').config()

const createStateMachine = require('./lib/StateMachine/main.js')
const socketRoutes = require('./lib/socketRoutes.js')

const restify = require('restify')
const socketIO = require('socket.io')

const io = socketIO({})

const sockets = {}

const stateMachine = createStateMachine()
stateMachine.registerSockets(sockets)

const server = restify.createServer({
  name: 'crosstown-trees',
  version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/register/:mac', function (req, res, next) {
  console.log(req.params)
  stateMachine.createNetworkDevice(req.params.mac)
  res.send(req.params)
  return next()
})

const f = server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
})

io.attach(f, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

io.on('connection', (socket)=>{
  console.log('socket-id', socket.id)
  sockets[socket.id] = socket

  stateMachine.onConnect(socket.id)

  socket.on('disconnect', ()=>{
    console.log('disconnect', socket.id)
    sockets[socket.id] === null
  })

  socketRoutes(socket, stateMachine)
})

// const stateMachine = createStateMachine({ doInit: false })

// const pattern = stateMachine.createPattern()
// const pattern2 = stateMachine.createPattern()
// const pattern3 = stateMachine.createPattern()

// const song = stateMachine.createSong()
// song.steps.push({ id: pattern.id, speed: 1, repeat: 1 })
// song.steps.push({ id: pattern2.id, speed: 1, repeat: 1 })

// const songB = stateMachine.createSong()
// songB.steps.push({ id: pattern3.id, speed: 1, repeat: 1 })
// songB.steps.push({ id: pattern2.id, speed: 1, repeat: 1 })
// songB.steps.push({ id: pattern.id, speed: 1, repeat: 4 })

// const playlist = stateMachine.createPlaylist()

// playlist.steps.push({ id: song.id, speed: 1, repeat: 1 })
// playlist.steps.push({ id: songB.id, speed: 1, repeat: 1 })

// stateMachine.loadSong(song.id)
// stateMachine.loadPlaylist(playlist.id)
// stateMachine.loadPattern(pattern.id)
