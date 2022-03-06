const express = require('express');
const dotenv = require('dotenv');
const socket = require('socket.io');
const http = require('http');

// require Database connection
const connectDB = require('./config/db');

// configure dotenv
dotenv.config({ path: './config/config.env' });

// Import Routes
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const lesson = require('./routes/api/lesson');
const notification = require('./routes/api/notification');

// Initialize express server
const app = express();
const httpSever = http.createServer(app);

// Initialize socket.io
const io = socket(httpSever);
require('./utils/socket')(io);

// Connect Database|
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));
app.use(express.static('./public'));
app.use((req, res, next) => {
	req.io = io;
	next();
});

// Define Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/lesson', lesson);
app.use('/api/notifications', notification);

// get port
const PORT = process.env.PORT || 5000;

// run server
httpSever.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`)
);
