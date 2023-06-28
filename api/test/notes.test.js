const { server } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { initialState, api } = require('./helper')

beforeEach(async () => {
  await Note.deleteMany({})
  for (const note of initialState) {
    const noteObj = new Note(note)
    await noteObj.save()
  }
})

describe('GET All Notes ', () => {
  test('are returned as JSON', async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialState.length)
  })

  test('first note is about MongoDB', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('MongoDB is awesome')
  })
})

describe('POST /api/notes', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'React is the best Ui lib',
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)
    expect(response.body).toHaveLength(initialState.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('without content us not added', async () => {
    const newNote = {
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialState.length)
  })
})

describe('DELETE /api/notes/:id', () => {
  test('can be deleted', async () => {
    const response = await api.get('/api/notes')
    const note2Delete = response.body[0]

    await api.delete(`/api/notes/${note2Delete.id}`)
      .expect(204)

    const responseExp = await api.get('/api/notes')
    expect(responseExp.body).toHaveLength((initialState.length - 1))
  })

  test('does not exist, can not be deleted', async () => {
    await api.delete('/api/notes/12345')
      .expect(400)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength((initialState.length))
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
