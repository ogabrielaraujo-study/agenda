'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  tag() {
    return this.hasOne('App/Models/Tag', 'tag_id', 'id')
  }
}

module.exports = Event
