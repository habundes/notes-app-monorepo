const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helper')
const { server } = require('../index')
const mongoose = require('mongoose')

describe.only('Creating  new User', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({
      username: 'devhugr',
      passwordHash
    })

    await user.save()
  })

  test('works as expected creating a new username', async () => {
    const userAtStart = await getUsers()

    const newUser = {
      username: 'habundes',
      name: 'Hugh',
      password: 't1tch'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const userNames = usersAtEnd.map(u => u.username)
    expect(userNames).toContain(newUser.username)
  })

  test('creation fails with right statuscode and message when username is duplicated', async () => {
    const userAtStart = await getUsers()
    const newUser = {
      username: 'habundes',
      name: 'Hugh',
      password: 't1tch'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body)
    expect(result.body.errors.username.message).toContain('`username` must to be unique')
    const userAtEnd = await getUsers()
    expect(userAtEnd).toHaveLength(userAtStart.length)
  })

  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })
})
