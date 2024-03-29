'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up() {
    this.create('events', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.datetime('start').notNullable()
      table.datetime('end')
      table.boolean('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventSchema
