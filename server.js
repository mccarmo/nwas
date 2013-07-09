var http = require("http"),
	express = require("express"),
    fs = require("fs"),
    socketio = require("socket.io");

var app = express(),
    server = http.createServer(app);

app.get('/', function (request, response) {
    fs.createReadStream('./pages/index.html').pipe(response)
})

app.get('/css', function (request, response) {
    fs.createReadStream('./pages/css/style.css').pipe(response)
})

app.get('/audiosockets', function (request, response) {
    fs.createReadStream('./pages/js/main.js').pipe(response)
})

app.get('/jquery', function (request, response) {
    fs.createReadStream('./pages/js/jquery-1.10.2.min.js').pipe(response)
})

var io = socketio.listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
	console.log("socket connected...")
	socket.on("play",function(data){
		socket.broadcast.emit("play",data);
		console.log("playing: " + data);
	});
	socket.on("stop",function(data){
		socket.broadcast.emit("stop",data);
		console.log("Stop: " + data);
	});
})

server.listen(process.env.PORT || 8080)
console.log("Server starded...")