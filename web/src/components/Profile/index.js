import React, { useContext } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import history from '../../services/history'

import Tags from '../Tags'
import { Button } from 'react-bootstrap'
import { FiLogOut } from 'react-icons/fi'

export default function Profile() {
  const [session, setSession] = useContext(Context)

  async function handleLogout() {
    setSession({})

    history.push('/')
  }

  return (
    <Container>
      <img src={session.avatar} alt="Perfil" />
      <h3>{session.name}</h3>
      <strong>{session.email}</strong>

      <Tags />

      <Button
        variant="outline-secondary"
        className="logout"
        onClick={handleLogout}
      >
        <FiLogOut size={18} /> Sair
      </Button>
    </Container>
  )
}
