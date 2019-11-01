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

  static get hidden() {
    return ['user_id', 'is_active', 'created_at', 'updated_at']
  }
}

module.exports = Event
