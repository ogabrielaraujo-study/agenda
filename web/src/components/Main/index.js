import React, { useContext, useEffect } from 'react'
import { Container } from './styles'
import 'bootstrap/scss/bootstrap.scss'

import { Context } from '../../store/context'
import history from '../../services/history'

import Agenda from '../Agenda'

export default function Main() {
  const [session, setSession] = useContext(Context)

  useEffect(() => {
    if (
      session.token === '' ||
      session.token === undefined ||
      session.token === null
    ) {
      alert('Faça login para visualizar a Agenda.')
      history.push('/')
    }
  }, [])

  return (
    <Container>
      <Agenda />
    </Container>
  )
}
