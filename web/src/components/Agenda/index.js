import React, { useEffect, useState, useRef } from 'react'
import { Container } from './styles'

import api from '../../services/api'
import io from 'socket.io-client'
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

export default function App() {
  const calendarRef = useRef()
  const [events, setEvents] = useState()
  const [changed, setChanged] = useState(0)
  const [show, setShow] = useState(false)
  const socket = io(process.env.REACT_APP_API_URL)
  let name = localStorage.getItem('@name') || ''
  let email = localStorage.getItem('@email') || ''

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

  async function createEvent(event) {
    const name = prompt('Enter name')

    const response = await api.post('/events', {
      title: name,
      start: event.dateStr,
    })

    setEvents([...events, response.data])
  }

  async function updateEvent(event) {
    const id = event.event.extendedProps._id

    await api.put('/events/' + id, {
      start: event.event.start,
      end: event.event.end,
      title: event.event._def.title,
    })
  }

  socket.on('createEvent', createdEvent => {
    setChanged(changed + 1)
  })

  socket.on('updateEvent', updatedEvent => {
    setChanged(changed + 1)
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function handleLogout() {
    localStorage.setItem('@token', '')
    localStorage.setItem('@name', '')
    localStorage.setItem('@email', '')
    localStorage.setItem('@avatar', '')

    window.location = '/'
  }

  return (
    <Container id="agenda">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Meu Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={name} disabled />
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" value={email} disabled />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleLogout}>Sair</Button>
        </Modal.Footer>
      </Modal>

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
            text: name || 'Perfil',
            click: handleShow,
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
      />
    </Container>
  )
}
