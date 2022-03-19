var config 	= require('../config');
var redis 	= require('redis').createClient;
var adapter = require('socket.io-redis');

var User = require('./models/user');
var Message = require('./models/message');

/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
var ioEvents = function(io) {

	// Messages namespace
	io.of('/dashboard').on('connection', function(socket) {

		if(socket.request.session.passport == null){
			socket.emit("redirect", "/login");
			return;
		}

		socket.join('user_room_'+socket.request.session.passport.user);

		User.findById(socket.request.session.passport.user, function (err, user) {
			User.setStatus(user, true);
			socket.broadcast.emit('updateUsersList', user);
		});

		// When a new message arrives
		socket.on('newMessage', function(message) {
			Message.create(message, function(err, message){
				if(err) throw err;
				socket.broadcast.to('user_room_'+message.to).emit('addMessage', message);
			});
		});
		
		// When a socket exits
		socket.on('disconnect', function() {
			// Check if user exists in the session
			if(socket.request.session.passport == null){
				return;
			}

			User.findById(socket.request.session.passport.user, function (err, user) {
				User.setStatus(user, false);
				socket.broadcast.emit('updateUsersList', user);
			});
		});
	});

}

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
var init = function(app){

	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	// Force Socket.io to ONLY use "websockets"; No Long Polling.
	io.set('transports', ['websocket']);

	// Using Redis
	let port = config.redis.port;
	let host = config.redis.host;
	let password = config.redis.password;
	let pubClient = redis(port, host, { auth_pass: password });
	let subClient = redis(port, host, { auth_pass: password, return_buffers: true, });

    io.adapter(adapter({ pubClient, subClient }));

	// Allow sockets to access session data
	io.use((socket, next) => {
		require('./session')(socket.request, {}, next);
	});

	// Define all Events
	ioEvents(io);

	// The server object will be then used to list to a port number
	return server;
}

module.exports = init;