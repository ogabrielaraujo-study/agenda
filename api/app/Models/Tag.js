'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  static get hidden() {
    return ['user_id', 'is_active', 'created_at', 'updated_at']
  }
}

module.exports = Tag
