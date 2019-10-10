import React from 'react'
import { Container } from './styles'

import api from '../../services/api'
import GoogleLogin from 'react-google-login'
import { IoLogoGoogle } from 'react-icons/io'

export default function Welcome() {
  function beforeResponse() {
    localStorage.setItem('@token', '')
    localStorage.setItem('@name', '')
    localStorage.setItem('@email', '')
    localStorage.setItem('@avatar', '')
  }

  async function responseGoogle(res) {
    const { googleId, name, email, imageUrl } = res.profileObj

    const loginResponse = await api.post('http://localhost:3335/auth/google', {
      googleId,
      name,
      email,
      imageUrl,
    })

    localStorage.setItem('@token', loginResponse.data.token)
    localStorage.setItem('@name', name)
    localStorage.setItem('@email', email)
    localStorage.setItem('@avatar', imageUrl)

    window.location = '/agenda'
  }

  return (
    <Container>
      <div className="container">
        <div className="content">
          <h1>Agenda</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quidem
            facere voluptatem non porro eligendi. Nam voluptatem officiis fugiat
            provident libero labore, ullam eius ipsa dolorum, saepe sapiente
            iure fuga.
          </p>
          <div className="buttons">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onRequest={beforeResponse}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button onClick={renderProps.onClick}>
                  <IoLogoGoogle />
                  Login com Google
                </button>
              )}
            />
          </div>
        </div>

        <div className="preview">
          <img src="http://placehold.it/600x600" alt="Agenda" />
        </div>
      </div>
    </Container>
  )
}
