import React, { useContext } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import history from '../../services/history'

import api from '../../services/api'
import GoogleLogin from 'react-google-login'
import { IoLogoGoogle } from 'react-icons/io'
import { FiGithub } from 'react-icons/fi'
import mockup from './mockup.png'

export default function Welcome() {
  const [, setSession] = useContext(Context)

  async function responseGoogle(res) {
    const { googleId, name, email, imageUrl } = res.profileObj

    const loginResponse = await api.post(
      `${process.env.REACT_APP_API_URL}/auth/google`,
      {
        googleId,
        name,
        email,
        imageUrl,
      }
    )

    const token = loginResponse.data.token

    await setSession({
      token,
      name,
      email,
      avatar: imageUrl,
    })

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }

    history.push('/agenda')
  }

  return (
    <Container>
      <div className="container">
        <div className="content">
          <h1>Agenda</h1>
          <p>
            Organize seu dia a dia e nunca mais esqueça seus compromissos. 
            <br />
            Entre e aumente sua produtividade agora mesmo!
          </p>
          <div className="buttons">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
            <a
              href="https://github.com/ogabrielaraujo/agenda"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiGithub />
              Repositório no GitHub
            </a>
          </div>
        </div>

        <div className="preview">
          <img src={mockup} alt="Agenda" />
        </div>
      </div>
    </Container>
  )
}
