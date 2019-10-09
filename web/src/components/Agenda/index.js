import React, { useEffect, useState, useRef } from 'react'
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

import { Container } from './styles'

export default function App() {
  const calendarRef = useRef()
  const [events, setEvents] = useState()
  const [changed, setChanged] = useState(0)
  const socket = io(process.env.REACT_APP_API_URL)

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

  function handlePopupAccount() {}

  return (
    <Container id="agenda">
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
            text: localStorage.getItem('user'),
            click: handlePopupAccount,
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
