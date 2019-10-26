import React, { useContext } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import { deleteEvent } from './functions'

import { FiArrowLeft, FiTrash } from 'react-icons/fi'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function Event() {
  const [session, setSession] = useContext(Context)

  function handleClose() {
    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
      currentEventName: '',
    })
  }

  function handleChangeName() {}
  function handleChangeTag() {}
  function handleChangeDescription() {}

  async function handleDelete() {
    await deleteEvent(session.currentEvent)

    // calendarRef.current.getApi().refetchEvents()
    toast.success('Evento deletado com sucesso!')

    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
      currentEventName: '',
    })
  }

  /*async function handleEvent(e) {
    e.preventDefault()

    if (
      currentEvent.event !== undefined &&
      currentEvent.event.title === eventName
    ) {
      setSession({
        ...session,
        showEvent: false,
      })
      setEventName('')
      setCurrentEvent(null)
      return
    }

    if (eventName.length < 3) {
      toast.error('Evento deve ter pelo menos 3 caracteres')
      return
    }

    await createEvent(eventName, currentEvent)

    toast.success('Evento foi salvo com sucesso!')
    calendarRef.current.getApi().refetchEvents()

    setSession({
      ...session,
      showEvent: false,
    })
    setEventName('')
    setCurrentEvent(null)
  }*/

  return (
    <Container show={session.showEvent}>
      <div className="header">
        <button onClick={handleClose} className="closebtn">
          <FiArrowLeft size={24} />
        </button>
        <button onClick={handleDelete} className="removeBtn">
          <FiTrash size={18} />
        </button>
      </div>

      {/* DATEPICKER */}

      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          value={session.currentEventName}
          onChange={handleChangeName}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tag</Form.Label>
        <Form.Control as="select" onChange={handleChangeTag} disabled>
          {session.tags &&
            session.tags.length > 0 &&
            session.tags.map(tag => <option key={tag.id}>{tag.name}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          onChange={handleChangeDescription}
        />
      </Form.Group>
    </Container>
  )
}
