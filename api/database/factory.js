'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    social_id: faker.integer(),
    email: faker.email(),
    name: faker.name(),
    avatar: faker.avatar(),
    source: 'google',
  }
})

Factory.blueprint('App/Models/Event', faker => {
  var start =
    new Date(faker.date({ year: 2019, month: 9, day: 28 }))
      .toISOString()
      .slice(0, -4) + '000Z'

  return {
    user_id: 1,
    title: faker.name(),
    start,
    end: null,
    is_active: 1,
  }
})
