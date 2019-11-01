import api from '../../services/api'

export async function getEvents() {
  const events = await api.get('events')

  const newEvents = events.data.map(event => ({
    ...event,
    backgroundColor: event.tag != null ? event.tag.color : '#3d3dc9',
  }))

  return newEvents
}

export async function createEvent(data) {
  await api.post('/events', {
    title: data.title,
    start: data.start,
    end: data.end,
  })
}

export async function updateEvent(data) {
  const id = data.id

  await api.put(`events/${id}`, {
    start: data.start,
    end: data.end,
    title: data.title,
  })
}

export async function deleteEvent(id) {
  await api.delete(`events/${id}`)
}
