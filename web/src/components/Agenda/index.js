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

//import Popup from '../Popup'
import { Modal, Button, Form } from 'react-bootstrap'

export default function App() {
  const [session, setSession, option, setOption] = useContext(Context)
  const calendarRef = useRef()
  const [events, setEvents] = useState()
  const [changed, setChanged] = useState(0)
  const [eventName, setEventName] = useState('')
  const [currentEvent, setCurrentEvent] = useState(null)

  //const socket = io(process.env.REACT_APP_API_URL)

  useEffect(() => {
    let calendarApi = calendarRef.current.getApi()

    if (window.innerWidth <= 990) {
      calendarApi.changeView('timeGridDay')
    }
  }, [])

  useEffect(() => {
    ;(async function loadEvents() {
      const response = await api.get('/events')

      setEvents(response.data)
    })()
  }, [changed])

  function createEvent(event) {
    setPopup(true)
    setCurrentEvent(event)
  }

  async function handleCreateEvent(e) {
    e.preventDefault()

    if (eventName.length < 3) {
      alert('Evento deve ter pelo menos 3 caracteres')
      return
    }

    if (currentEvent.event == undefined) {
      const response = await api.post('/events', {
        title: eventName,
        start: currentEvent.dateStr,
      })

      setEvents([...events, response.data])
    } else {
      const response = await api.put(`/events/${currentEvent.event.id}`, {
        title: eventName,
        start: currentEvent.dateStr,
      })

      console.log('refresh')
    }

    setPopup(false)
    setEventName('')
    setCurrentEvent(null)
  }

  async function updateEvent(current) {
    const id = current.event.id

    await api.put('/events/' + id, {
      start: current.event.start,
      end: current.event.end,
      title: current.event.title,
    })
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
      <Modal show={popup} onHide={handleClosePopup}>
        <Form onSubmit={handleCreateEvent}>
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
            <Button onClick={handleCreateEvent}>Salvar</Button>
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
        dateClick={event => createEvent(event)}
        events={events}
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
