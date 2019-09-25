'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments()
      table.string('social_id', 80).unique()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table.string('name', 80).notNullable()
      table.string('avatar', 254)
      table.string('source', 80).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
