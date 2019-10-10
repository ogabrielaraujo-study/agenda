import React from 'react'
import { Container } from './styles'
import 'bootstrap/scss/bootstrap.scss'

import Agenda from '../Agenda'

export default function Main() {
  function checkLogin() {
    let token = localStorage.getItem('@token')

    if (token === '' || token == undefined || token == 'undefined') {
      alert('Faça login para visualizar a Agenda.')
      window.location = '/'
    }
  }

  checkLogin()

  return (
    <Container>
      <Agenda />
    </Container>
  )
}
