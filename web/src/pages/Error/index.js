import React from 'react'
import { Container } from './styles'

import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <Container>
      <div className="container">
        <h1>Página não encontrada</h1>
        <Link to="/">Voltar para página inicial</Link>
      </div>
    </Container>
  )
}
