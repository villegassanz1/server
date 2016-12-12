var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var puerto = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
/*var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password : '',
	database : 'bus'
});
connection.connect();*/
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket) {
	//io.emit('configuracion', ip + ':' + puerto);
	/*connection.connect();
	connection.query('SELECT * from chofer;', function(err, rows, fields) {
		if(!err) {
			console.log('The solution is: ', rows);
		}
		else {
			console.log('Error while performing Query.');
		}
	});*/
	console.log('El usuario: ' + socket.id + ' se ha conectado.');
	/*socket.on('mensaje', function(mensaje) {
		console.log(socket.id + ': ' + mensaje);
		socket.emit("new message", "Hola Mundo.");
	});
	socket.on('b', function(mensaje) {
		console.log(socket.id + ': ' + mensaje);
	});*/
	socket.on('enviarCoordenadas', function(mensaje) {
		//console.log(socket.id + ': ' + mensaje);
		var coordenadas = mensaje.split(',');
		console.log(socket.id + ': ' + coordenadas[0] + ', ' + coordenadas[1]);
		socket.broadcast.emit('recibirCoordenadas', {
			idUsuario: socket.id,
			latitud: coordenadas[0],
			longitud: coordenadas[1]
		});
	});
	socket.on('disconnect', function() {
		console.log('El usuario: ' + socket.id + ' se ha desconectado.');
	});
});
http.listen(puerto, ip, function() {
	console.log('Servidor listo en el puerto 3000...');
});