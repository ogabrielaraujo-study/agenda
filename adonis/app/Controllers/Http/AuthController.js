'use strict'

const User = use('App/Models/User')

class AuthController {
  async redirect({ ally }) {
    await ally.driver('google').redirect()
  }

  async callback({ ally, auth }) {
    try {
      const googleUser = await ally.driver('google').getUser()

      const userDetails = {
        social_id: googleUser.getId(),
        email: googleUser.getEmail(),
        name: googleUser.getName(),
        avatar: googleUser.getAvatar(),
        source: 'google',
      }

      const whereClause = {
        email: googleUser.getEmail(),
        source: 'google',
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      const token = await auth.generate(user)

      return token
    } catch (error) {
      return ['Error! Unable to authenticate. Try again later']
    }
  }

  async loginWithGoogleId({ request, auth }) {
    const data = request.all()

    const googleUser = {
      social_id: data.googleId,
      email: data.email,
      name: data.name,
      avatar: data.imageUrl,
      source: 'google',
    }

    const whereClause = {
      social_id: data.googleId,
      email: googleUser.email,
      source: 'google',
    }

    const user = await User.findOrCreate(whereClause, googleUser)
    const token = await auth.generate(user)

    return token
  }
}

module.exports = AuthController
