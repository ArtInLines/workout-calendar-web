const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
	user: String,
	data: [
		{
			done: String,
			date: Number,
			month: Number,
			year: Number,
		},
	],
	programme: [
		{
			date: Date,
			workouts: Array,
			done: String,
		},
	],
});

module.exports = mongoose.model('model', model);
