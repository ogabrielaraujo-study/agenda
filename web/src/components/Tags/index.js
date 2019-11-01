import React, { useContext, useEffect, useState } from 'react'
import { Container, Color, InputColorPicker } from './styles'

import { Context } from '../../store/context'
import { getTags, createTag, deleteTag } from './functions'

import { FiTrash, FiSend } from 'react-icons/fi'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { TwitterPicker } from 'react-color'

export default function Tag() {
  const [session, setSession] = useContext(Context)
  const [tagName, setTagName] = useState('')
  const [tagColor, setTagColor] = useState('#3d3dc9')
  const [colorPicker, setColorPicker] = useState(false)

  useEffect(() => {
    async function loadTags() {
      const tags = await getTags()

      setSession({ ...session, tags })
    }

    loadTags()
    // eslint-disable-next-line
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const newTag = await createTag(tagName, tagColor)

    setSession({
      ...session,
      tags: [...session.tags, newTag.data],
    })

    toast.success('Nova tag adicionada!')
    setTagColor('#3d3dc9')
    setTagName('')
    setColorPicker(false)
  }

  async function handleDelete(tagClicked) {
    await deleteTag(tagClicked)

    const tags = await getTags()
    setSession({ ...session, tags })

    toast.success('Tag removida com sucesso!')
  }

  function handleChangeColor(color) {
    setColorPicker(false)
    setTagColor(color.hex)
    console.log(color.hex)
  }

  return (
    <Container>
      {session.tags &&
        session.tags.length > 0 &&
        session.tags.map(tag => (
          <li key={tag.id}>
            <Color color={tag.color} />
            <span className="name">{tag.name}</span>
            <button onClick={() => handleDelete(tag.id)}>
              <FiTrash size="18" />
            </button>
          </li>
        ))}
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mt-4">
          <InputGroup.Prepend>
            <InputColorPicker
              className="tagName"
              onChange={e => {
                setTagColor(e.target.value)
                setColorPicker(false)
              }}
              background={tagColor}
              onClick={() => setColorPicker(!colorPicker)}
              autocomplete="off"
              readOnly
            />
            {colorPicker && (
              <div className="colorPicker">
                <TwitterPicker
                  color={tagColor}
                  onChange={handleChangeColor}
                  triangle="top-left"
                  colors={[
                    '#3d3dc9',
                    '#FF6900',
                    '#FCB900',
                    '#7BDCB5',
                    '#00D084',
                    '#8ED1FC',
                    '#0693E3',
                    '#EB144C',
                    '#F78DA7',
                    '#9900EF',
                    '#ABB8C3',
                    '#666',
                    '#444',
                    '#000',
                  ]}
                />
              </div>
            )}
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            className="colorName"
            value={tagName}
            placeholder="Tag"
            onChange={e => setTagName(e.target.value)}
            onClick={() => setColorPicker(false)}
          />
          <InputGroup.Append>
            <Button
              type="submit"
              variant="outline-secondary"
              onClick={handleSubmit}
            >
              <FiSend />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  )
}
