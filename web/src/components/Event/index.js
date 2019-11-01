import React, { useContext, useState } from 'react'
import { Container, AnimateCheck } from './styles'

import { Context } from '../../store/context'
import {
  createEvent,
  updateEvent,
  deleteEvent,
  formatDateTime,
} from './functions'

import { FiArrowLeft, FiTrash, FiSave } from 'react-icons/fi'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import produce from 'immer'
import Lottie from 'react-lottie'
import animationData from './checked.json'

export default function Event() {
  const [session, setSession] = useContext(Context)
  const [paused, setPaused] = useState(true)
  const [stopped, setStopped] = useState(true)

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

  function handleChangeTag(e) {
    const nextEvent = produce(session.currentEvent, draft => {
      draft.tag_id = e.target.value
    })

    setSession({
      ...session,
      currentEvent: nextEvent,
    })
  }

  function handleChangeDescription(e) {
    const nextEvent = produce(session.currentEvent, draft => {
      draft.description = e.target.value
    })

    setSession({
      ...session,
      currentEvent: nextEvent,
    })
  }

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

    setStopped(false)
    setPaused(false)

    setTimeout(() => {
      setSession({
        ...session,
        showEvent: false,
        currentEvent: null,
      })

      setPaused(true)
      setStopped(true)
    }, 1000)
  }

  async function handleDelete() {
    await deleteEvent(session.currentEvent.id)

    toast.success('Evento deletado com sucesso!')

    setSession({
      ...session,
      showEvent: false,
      currentEvent: null,
    })
  }

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

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
      <Form onSubmit={handleSave}>
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
          <Form.Control
            as="select"
            onChange={handleChangeTag}
            value={(session.currentEvent && session.currentEvent.tag_id) || ''}
          >
            {session.tags &&
              session.tags.length > 0 &&
              session.tags.map(tag => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            name="description"
            onChange={handleChangeDescription}
            value={
              (session.currentEvent && session.currentEvent.description) || ''
            }
          />
        </Form.Group>

        <Button
          variant="outline-secondary"
          type="submit"
          className="save"
          onClick={handleSave}
        >
          <FiSave size={18} /> Salvar
        </Button>
      </Form>

      <AnimateCheck status={paused}>
        <Lottie
          options={defaultOptions}
          height={275}
          width={275}
          isStopped={stopped}
          isPaused={paused}
        />
      </AnimateCheck>
    </Container>
  )
}
