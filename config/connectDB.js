const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	});

	console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
