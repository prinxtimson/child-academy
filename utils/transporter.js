const nodemailer = require('nodemailer');

// nodemailer options
const options = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: process.env.USER_EMAIL,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.CLIENT_REFRESH_TOKEN,
		accessToken: process.env.ACCESS_TOKEN,
	},
};

// initialize nodemail utils
module.exports = nodemailer.createTransport(options);
