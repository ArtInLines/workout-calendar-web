const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-bxkoc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
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
