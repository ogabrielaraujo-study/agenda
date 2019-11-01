'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventDescriptionSchema extends Schema {
  up() {
    this.alter('events', table => {
      table.string('description', 255).notNullable()
    })
  }

  down() {
    this.table('event_descriptions', table => {
      table.dropColumn('description')
    })
  }
}

module.exports = EventDescriptionSchema
