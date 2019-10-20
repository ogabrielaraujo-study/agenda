import React, { useContext, useState, useEffect, useRef } from 'react'
import { Container } from './styles'

import { Context } from '../../store/context'
import api from '../../services/api'
import history from '../../services/history'
//import io from 'socket.io-client'
import 'dotenv/config'

// FullCalendar
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/bootstrap/main.css'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import brLocale from '@fullcalendar/core/locales/pt-br'

import { Modal, Button, Form } from 'react-bootstrap'
import { FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getEvents, createEvent, updateEvent, deleteEvent } from './events'

export default function App() {
  const [session, setSession] = useContext(Context)
  const calendarRef = useRef()
  const [eventName, setEventName] = useState('')
  const [currentEvent, setCurrentEvent] = useState(null)
  //const socket = io(process.env.REACT_APP_API_URL)

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi()

    if (window.innerWidth <= 990) {
      calendarApi.changeView('timeGridDay')
    }
  }, [])

  function handleDateClick(event) {
    setPopup(true)
    setCurrentEvent(event)
  }

  async function handlePopupEvent(e) {
    e.preventDefault()

    if (
      currentEvent.event !== undefined &&
      currentEvent.event.title === eventName
    ) {
      setPopup(false)
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
    setPopup(false)
    setEventName('')
    setCurrentEvent(null)
  }

  async function handleDeleteEvent(current) {
    await deleteEvent(current)

    calendarRef.current.getApi().refetchEvents()
    toast.success('Evento deletado com sucesso!')

    setPopup(false)
    setEventName('')
    setCurrentEvent(null)
  }

  function handleEventClick(eventClicked) {
    setPopup(true)
    setCurrentEvent(eventClicked)
    setEventName(eventClicked.event.title)
  }

  /* socket.on('createEvent', createdEvent => {
    setChanged(changed + 1)
  }) */

  /* socket.on('updateEvent', updatedEvent => {
    setChanged(changed + 1)
  }) */

  const [profile, setProfile] = useState(false)
  const handleShowProfile = () => setProfile(true)
  const handleCloseProfile = () => setProfile(false)

  const [popup, setPopup] = useState(false)
  const handleClosePopup = () => {
    setPopup(false)
    setEventName('')
  }

  async function handleLogout() {
    setSession({})

    history.push('/')
  }

  return (
    <Container id="agenda">
      {/* Perfil */}
      <Modal show={profile} onHide={handleCloseProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Meu Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={session.name} disabled />
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" value={session.email} disabled />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleLogout}>Sair</Button>
        </Modal.Footer>
      </Modal>

      {/* Evento */}
      <Modal show={popup} onHide={handleClosePopup} centered>
        <Form onSubmit={handlePopupEvent}>
          <Modal.Header closeButton>
            <Modal.Title>Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {currentEvent && currentEvent.event && (
              <Button
                variant="danger"
                className="withIcon"
                onClick={() => handleDeleteEvent(currentEvent)}
              >
                <FiTrash2 size="16" />
              </Button>
            )}
            <Button onClick={handlePopupEvent}>Salvar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Agenda */}
      <FullCalendar
        ref={calendarRef}
        id="fullCalendar"
        defaultView="timeGridWeek"
        plugins={[
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          bootstrapPlugin,
        ]}
        dateClick={event => handleDateClick(event)}
        events={getEvents}
        eventDrop={event => updateEvent(event)}
        eventResize={event => updateEvent(event)}
        editable={true}
        navLinks={true}
        eventLimit={true}
        selectable={true}
        allDaySlot={false}
        nowIndicator={true}
        locale={brLocale}
        themeSystem="bootstrap"
        height="parent"
        customButtons={{
          account: {
            text: session.name || 'Perfil',
            click: handleShowProfile,
          },
        }}
        header={{
          left: 'today prev,next',
          center: 'title',
          right:
            'dayGridMonth,timeGridWeek,timeGridDay,timeGridFourDay account',
        }}
        titleFormat={{
          year: 'numeric',
          month: 'long',
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
        columnHeaderFormat={{
          day: 'numeric',
          weekday: 'long',
          omitCommas: false,
        }}
        snapDuration="00:30"
        slotDuration="01:00"
        slotLabelInterval="01:00"
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
        }}
        buttonText={{
          next: 'Próximo',
          prev: 'Voltar',
        }}
        eventClick={handleEventClick}
      />
    </Container>
  )
}
