'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventTagSchema extends Schema {
  up() {
    this.alter('events', table => {
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.table('events', table => {
      // reverse alternations
      table.dropColumn('tag_id')
    })
  }
}

module.exports = EventTagSchema
