import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from './styles'

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
