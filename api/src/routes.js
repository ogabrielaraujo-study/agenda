const express = require('express');

const routes = new express.Router();

const EventController = require('./controllers/EventController');

// Events
routes.get('/events', EventController.index);
routes.post('/events', EventController.store);
routes.put('/events/:eventId', EventController.update);
routes.delete('/events/:eventId', EventController.delete);

module.exports = routes;
