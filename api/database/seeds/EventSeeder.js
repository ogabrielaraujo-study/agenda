'use strict'

/*
|--------------------------------------------------------------------------
| EventSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class EventSeeder {
  async run() {
    await Factory.model('App/Models/Event').createMany(15)
  }
}

module.exports = EventSeeder
