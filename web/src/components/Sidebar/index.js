import React, { useContext } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import Event from '../Event'
import Profile from '../Profile'

export default function Sidebar() {
  const [session] = useContext(Context)

  return (
    <Container id="sidebar">
      <Profile />

      <Event show={session.showEvent} />
    </Container>
  )
}
