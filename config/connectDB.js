const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/config.env` });

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(`mongodb+srv://sansaSucks:g8MbJ2fEz3Q2@cluster0-bxkoc.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
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
