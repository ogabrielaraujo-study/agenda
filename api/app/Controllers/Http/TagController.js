'use strict'

const Tag = use('App/Models/Tag')

class TagController {
  async index({ auth }) {
    return await Tag.query()
      .where('is_active', 1)
      .where('user_id', auth.user.id)
      .orderBy('id', 'asc')
      .fetch()
  }

  async store({ request, auth }) {
    const data = request.only(['name', 'color'])

    data.user_id = auth.user.id

    return await Tag.create(data)
  }

  async show({ request }) {
    return await Tag.findOrFail(request.params.id)
  }

  async update({ request, response, auth, params }) {
    const data = request.all()
    const tag = await Tag.findOrFail(params.id)

    if (auth.user.id !== tag.user_id) {
      return response.status(401).send('Not authorized')
    }

    tag.name = data.name
    tag.color = data.color

    await tag.save()

    return tag
  }

  async destroy({ response, params, auth }) {
    const tag = await Tag.findOrFail(params.id)

    if (auth.user.id !== tag.user_id) {
      return response.status(401).send('Not authorized')
    }

    tag.is_active = 0
    tag.save()
  }
}

module.exports = TagController
