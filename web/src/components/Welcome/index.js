import React from 'react'
import { Container } from './styles'

import { Link } from 'react-router-dom'
import { IoLogoGoogle } from 'react-icons/io'

export default function Welcome() {
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
            <Link to="/login/google">
              <IoLogoGoogle />
              Login com Google
            </Link>
          </div>
        </div>

        <div className="preview">
          <img src="http://placehold.it/600x600" alt="Agenda" />
        </div>
      </div>
    </Container>
  )
}
