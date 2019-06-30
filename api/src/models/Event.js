const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title: String,
	start: String,
	end: String,
	className: {
		type: String,
		default: 'btn-primary',
	}
}, {
	timestamps: true,
});

module.exports = mongoose.model('Event', EventSchema);
