'use strict'

const Event = use('App/Models/Event')

class EventController {
  async index({ request, auth }) {
    const between = request.only(['start', 'end'])

    if (between.start && between.end) {
      return await Event.query()
        .with('tag')
        .where('start', '>=', between.start + '.000Z')
        .where('start', '<', between.end + '.000Z')
        .orderBy('start', 'asc')
        .fetch()
    }

    return await Event.query()
      .with('tag')
      .where('is_active', 1)
      .where('user_id', auth.user.id)
      .orderBy('start', 'asc')
      .fetch()
  }

  async store({ request, auth }) {
    const data = request.only([
      'title',
      'start',
      'end',
      'tag_id',
      'description',
    ])

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

    event.title = data.title || event.title
    event.start = data.start || event.start
    event.end = data.end || event.end
    event.tag_id = data.tag_id || event.tag_id
    event.description = data.description || event.description

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
