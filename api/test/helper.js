const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)
const initialState = [
  {
    content: 'MongoDB is awesome',
    date: new Date(),
    important: true
  },
  {
    content: 'NodeJS is amazing',
    date: new Date(),
    important: true
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDbAfter = await User.find({})
  return usersDbAfter.map(user => user.toJSON())
}

module.exports = { initialState, api, getAllContentFromNotes, getUsers }
