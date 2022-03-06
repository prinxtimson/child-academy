const jwt = require('jsonwebtoken');

// socket connection
module.exports = io => {
	// Authenticate socket connection and connect socket to a room
	io.use((socket, next) => {
		if (socket.handshake.query && socket.handshake.query.token) {
			jwt.verify(
				socket.handshake.query.token,
				process.env.JWTSECRET,
				function (err, decoded) {
					if (err) return next(new Error('Authentication error'));
					socket.decoded = decoded;
					next();
				}
			);
		} else {
			next(new Error('Authentication error'));
		}
	})
		.on('connection', socket => {
			socket.join(socket.decoded.user.id);

			// remove socket from room
			socket.on('disconnect', () => {
				socket.leave(socket.decoded.id);
			});
		})
		.on('disconnect', socket => {
			socket.leave(socket.decoded.id);
		});
};
