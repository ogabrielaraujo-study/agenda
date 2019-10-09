import React from 'react'
import { Container } from './styles'
import 'bootstrap/scss/bootstrap.scss'

import Agenda from '../Agenda'

export default function Main() {
  return (
    <Container>
      <Agenda />
    </Container>
  )
}
