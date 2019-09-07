import Event from '../models/Event'

class EventController {
  async index(req, res) {
    const events = await Event.find().sort('-createdAt')

    return res.json(events)
  }

  async store(req, res) {
    const { title, start, end, className } = req.body

    const event = await Event.create({
      title,
      start,
      end,
      className,
    })

    req.io.emit('createEvent', event)

    return res.json(event)
  }

  async update(req, res) {
    const { title, start, end, className } = req.body

    const event = await Event.findById(req.params.eventId)

    if (!event) {
      return res.json('Not found')
    }

    event.title = title
    event.start = start
    event.end = end
    event.className = className

    // save
    event.save()

    // socket
    req.io.emit('updateEvent', event)

    return res.json(event)
  }

  async delete(req, res) {
    const event = await Event.findById(req.params.eventId)

    if (!event) {
      return res.json('Not found')
    }

    event.remove()

    req.io.emit('deleteEvent', event)

    return res.json({ status: 'deleted' })
  }
}

export default new EventController()
