'use strict'

const Event = use('App/Models/Event')

class EventController {
  async index() {
    return await Event.query()
      .where('is_active', 1)
      .orderBy('id', 'asc')
      .fetch()
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'start', 'end'])

    data.user_id = auth.user.id

    return await Event.create(data)
  }

  async show({ request }) {
    return await Event.findOrFail(request.params.id)
  }

  async update({ request, response, auth, params }) {
    const data = request.all()
    const event = await Event.findOrFail(params.id)

    if (auth.user.id !== event.user_id) {
      return response.status(401).send('Not authorized')
    }

    event.title = data.title
    event.start = data.start
    event.end = data.end

    await event.save()

    return event
  }

  async destroy({ response, params, auth }) {
    const event = await Event.findOrFail(params.id)

    if (auth.user.id !== event.user_id) {
      return response.status(401).send('Not authorized')
    }

    event.is_active = 0
    event.save()
  }
}

module.exports = EventController
