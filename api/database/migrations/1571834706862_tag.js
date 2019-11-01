'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up() {
    this.create('tags', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 255).notNullable()
      table.string('color', 7)
      table.boolean('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('tags')
  }
}

module.exports = TagSchema
