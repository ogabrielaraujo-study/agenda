import api from '../../services/api'

export async function getTags() {
  const tags = await api.get('tags')

  return tags.data
}

export async function createTag(name, color) {
  const tag = await api.post('tags', {
    name,
    color,
  })

  return tag
}

export async function deleteTag(id) {
  await api.delete(`tags/${id}`)
}
