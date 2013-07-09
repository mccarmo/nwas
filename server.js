var http = require("http"),
	express = require("express"),
    fs = require("fs");
 //  socketio = require("socket.io");

var app = express(),
    server = http.createServer(app);

app.use(express.static(__dirname))

app.get('/', function (request, response) {
    fs.createReadStream(__dirname + '/pages/index.html').pipe(response)
})

app.get('/css', function (request, response) {
    fs.createReadStream(__dirname + '/pages/css/style.css').pipe(response)
})

app.get('/audiosockets', function (request, response) {
    fs.createReadStream(__dirname + '/pages/js/main.js').pipe(response)
})

app.get('/jquery', function (request, response) {
    fs.createReadStream(__dirname + '/pages/js/jquery-1.10.2.min.js').pipe(response)
})

/*var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
	console.log("socket connected...")
	socket.on("msg",function(msg){
		console.log(msg)
	});
})*/

server.listen(8080)
console.log("listening on port 8080...")