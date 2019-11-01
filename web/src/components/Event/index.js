import React, { useContext } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import { createEvent, updateEvent, deleteEvent } from './functions'

import { FiArrowLeft, FiTrash } from 'react-icons/fi'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import produce from 'immer'

export default function Event() {
  const [session, setSession] = useContext(Context)

  function formatDateTime(dateTime) {
    return format(new Date(dateTime), "Y-M-dd'T'HH:mm", { locale: pt })
  }

  function handleClose() {
    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
    })
  }

  function handleChangeTitle(e) {
    const nextEvent = produce(session.currentEvent, draft => {
      draft.title = e.target.value
    })

    setSession({
      ...session,
      currentEvent: nextEvent,
    })
  }

  function handleChangeInicio(e) {
    const nextEvent = produce(session.currentEvent, draft => {
      draft.start = e.target.value
    })

    setSession({
      ...session,
      currentEvent: nextEvent,
    })
  }

  function handleChangeFim(e) {
    const nextEvent = produce(session.currentEvent, draft => {
      draft.end = e.target.value
    })

    setSession({
      ...session,
      currentEvent: nextEvent,
    })
  }

  function handleChangeTag() {}

  function handleChangeDescription() {}

  async function handleSave(e) {
    e.preventDefault()

    if (!session.currentEvent) {
      toast.error('Nenhum evento encontrado')
      return
    }

    if (session.currentEvent.id === null) {
      await createEvent(session.currentEvent)
    } else {
      await updateEvent(session.currentEvent)
    }

    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
    })
  }

  async function handleDelete() {
    await deleteEvent(session.currentEvent.id)

    // calendarRef.current.getApi().refetchEvents()
    toast.success('Evento deletado com sucesso!')

    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
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
          value={(session.currentEvent && session.currentEvent.title) || ''}
          onChange={handleChangeTitle}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Início</Form.Label>
        <Form.Control
          type="datetime-local"
          value={
            session.currentEvent && session.currentEvent.start
              ? formatDateTime(session.currentEvent.start)
              : ''
          }
          onChange={handleChangeInicio}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Fim</Form.Label>
        <Form.Control
          type="datetime-local"
          value={
            session.currentEvent && session.currentEvent.end
              ? formatDateTime(session.currentEvent.end)
              : ''
          }
          onChange={handleChangeFim}
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
          disabled
          as="textarea"
          rows="5"
          onChange={handleChangeDescription}
        />
      </Form.Group>

      <button onClick={handleSave} type="submit">
        Salvar
      </button>
    </Container>
  )
}
