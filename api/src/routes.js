import { Router } from 'express'

// Controllers
import EventController from './controllers/EventController'

const routes = new Router()

// Status
routes.get('/', (req, res) => {
  return res.json({ status: true })
})

// Events
routes.get('/events', EventController.index)
routes.post('/events', EventController.store)
routes.put('/events/:eventId', EventController.update)
routes.delete('/events/:eventId', EventController.delete)

export default routes
