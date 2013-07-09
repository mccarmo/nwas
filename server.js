var http = require("http"),
	express = require("express"),
    fs = require("fs"),
    socketio = require("socket.io");

var app = express(),
    server = http.createServer(app);

app.use(express.static(__dirname))

app.get('/', function (request, response) {
    fs.createReadStream('pages/index.html').pipe(res)
})

var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
	console.log("client connected...")
})

server.listen(8000)
console.log("listening on port 8000")