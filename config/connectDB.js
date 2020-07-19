const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});

		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = connectDB;
