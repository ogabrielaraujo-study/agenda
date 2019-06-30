const Event = require('../models/Event');

module.exports = {
	async index(req, res) {
		const events = await Event.find().sort('-createdAt');

		return res.json(events);
	},

	async store(req, res) {
		const { title, start, end, className } = req.body;

		const event = await Event.create({
			title,
			start,
			end,
			className
		});

		req.io.emit('createEvent', event);

		return res.json(event);
	},

	async update(req, res) {
		const { title, start, end, className } = req.body;

		const event = Event.findById(req.params.eventId);
		event.then((event) => {

			if (!event) {
				return res.json('Not found');
			}

			Object.keys(req.body).map(function(key, index) {
				event[key] = req.body[key];
			});

			// save
			return event.save();
		})
			.then((event) => {
				req.io.emit('updateEvent', event);

				res.json(event);
			})
			.catch((err) => {
				// send the error to the error handler
				res.json('Error: ' + err);
			});
	},

	async delete(req, res) {
		const event = Event.findById(req.params.eventId);

		console.log(event);

		event.then((event) => {

			// resource not found, let's throw an error
			if (!event) {
				return res.json('Not found');
			}

			return event.remove();
		})
			.then((event) => {
				req.io.emit('deleteEvent', event);

				res.json(event);
			})
			.catch((err) => {
				// send the error to the error handler
				res.json('Error: ' + err);
			})
	},
};
