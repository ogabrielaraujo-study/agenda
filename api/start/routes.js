'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { status: true }
})

Route.get('/login/google', 'AuthController.redirect')
Route.get('/authenticated/google', 'AuthController.callback')
Route.post('/auth/google', 'AuthController.loginWithGoogleId')

Route.group(() => {
  // Events
  Route.resource('events', 'EventController').apiOnly()
}).middleware(['auth'])
