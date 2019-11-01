import React, { useContext, useEffect, useRef } from 'react'
import { Container } from './styles'

import 'dotenv/config'
import { Context } from '../../store/context'
import produce from 'immer'
import { format, addMinutes } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { getEvents, updateEvent } from '../Event/functions'

// FullCalendar
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import brLocale from '@fullcalendar/core/locales/pt-br'

export default function Agenda() {
  const [session, setSession] = useContext(Context)
  const calendarRef = useRef()

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi()

    if (window.innerWidth <= 990) {
      calendarApi.changeView('timeGridDay')
    }
  }, [])

  useEffect(() => {
    calendarRef.current.getApi().refetchEvents()
  }, [session.showEvent])

  function handleDateClick(event) {
    setSession({
      ...session,
      showEvent: true,
      currentEvent: {
        id: null,
        title: '',
        start: event.date,
        end: addMinutes(event.date, 60),
      },
    })
  }

  function handleSelectClick(event) {
    setSession({
      ...session,
      showEvent: true,
      currentEvent: {
        id: null,
        title: '',
        start: event.start,
        end: event.end,
      },
    })
  }

  async function handleEventClick(eventClicked) {
    await setSession({
      ...session,
      showEvent: true,
      currentEvent: {
        id: eventClicked.event.id,
        title: eventClicked.event.title,
        start: eventClicked.event.start,
        end: eventClicked.event.end,
        tag_id: eventClicked.event.extendedProps.tag_id,
      },
    })
  }

  function handleRenderEvent(info) {
    if (session.currentEvent && info.event.id !== session.currentEvent.id) {
      info.el.style.cssText += 'opacity: 0.3;'
    }
  }

  async function handleEventDrop(e) {
    if (session.currentEvent) {
      const nextEvent = produce(session.currentEvent, draft => {
        draft.start = e.event.start
        draft.end = e.event.end
      })

      setSession({
        ...session,
        currentEvent: nextEvent,
      })
    }

    await updateEvent(e.event)
  }

  async function handleEventResize(e) {
    if (session.currentEvent) {
      const nextEvent = produce(session.currentEvent, draft => {
        draft.end = e.event.end
      })

      setSession({
        ...session,
        currentEvent: nextEvent,
      })
    }

    await updateEvent(e.event)
  }

  return (
    <Container id="agenda">
      <FullCalendar
        ref={calendarRef}
        events={getEvents}
        eventClick={handleEventClick}
        select={event => handleSelectClick(event)}
        dateClick={event => handleDateClick(event)}
        eventDrop={event => handleEventDrop(event)}
        eventResize={event => handleEventResize(event)}
        id="fullCalendar"
        defaultView="timeGridWeek"
        plugins={[
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          bootstrapPlugin,
        ]}
        columnHeaderText={date => {
          return format(date, 'EEEE', { locale: pt })
            ? format(date, 'EEEE', { locale: pt })
                .split('-')[0]
                .toUpperCase() +
                ', ' +
                format(date, 'dd')
            : null
        }}
        editable={true}
        navLinks={true}
        eventLimit={true}
        selectable={true}
        allDaySlot={false}
        nowIndicator={true}
        locale={brLocale}
        eventRender={handleRenderEvent}
        themeSystem="bootstrap"
        height="parent"
        header={{
          left: 'today prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridFourDay',
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
