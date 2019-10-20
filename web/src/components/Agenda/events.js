import api from '../../services/api'

export async function getEvents() {
  const events = await api.get('events')

  return events.data
}

export async function createEvent(name, data) {
  if (data.event === undefined) {
    await api.post('/events', {
      title: name,
      start: data.dateStr,
    })
  } else {
    await api.put(`/events/${data.event.id}`, {
      title: name,
      start: data.dateStr,
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

export async function deleteEvent(data) {
  const id = data.event.id

  await api.delete(`events/${id}`)
}
