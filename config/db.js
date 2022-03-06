const mongoose = require('mongoose');

// database connection
const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log(`MongoDB connected: ${connect.connection.host}`);
	} catch (err) {
		console.log(`Error: ${err.message}`);

		process.exit(1);
	}
};

module.exports = connectDB;
