import api from '../../services/api'

export async function getEvents() {
  const events = await api.get('events')

  const newEvents = events.data.map(event => ({
    ...event,
    backgroundColor: event.tag != null ? event.tag.color : '#3d3dc9',
  }))

  return newEvents
}

export async function createEvent(name, data) {
  if (data.event === undefined) {
    await api.post('/events', {
      title: name,
      start: data.startStr !== undefined ? data.startStr : data.dateStr,
      end: data.endStr !== undefined ? data.endStr : null,
    })
  } else {
    await api.put(`/events/${data.event.id}`, {
      title: name,
      start: data.startStr,
      end: data.endStr,
    })
  }
}

export async function updateEvent(data) {
  const id = data.event.id

  await api.put(`events/${id}`, {
    start: data.event.start,
    end: data.event.end,
    title: data.event.title,
  })
}

export async function deleteEvent(id) {
  await api.delete(`events/${id}`)
}
