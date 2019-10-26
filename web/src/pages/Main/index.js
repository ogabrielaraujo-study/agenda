import React, { useContext, useEffect } from 'react'
import { ThemeProvider } from 'react-bootstrap'
import '../../styles/bootstrap.scss'
import { Container } from './styles'

import { Context } from '../../store/context'
import history from '../../services/history'

import Agenda from '../../components/Agenda'
import Sidebar from '../../components/Sidebar'

export default function Main() {
  const [session] = useContext(Context)

  useEffect(() => {
    if (
      session.token === '' ||
      session.token === undefined ||
      session.token === null
    ) {
      alert('Faça login para visualizar a Agenda.')
      history.push('/')
    }
  }, [session])

  return (
    <ThemeProvider>
      <Container>
        <Sidebar />
        <Agenda />
      </Container>
    </ThemeProvider>
  )
}
