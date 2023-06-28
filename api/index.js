require('dotenv').config()
require('./mongo.js')

const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleError.js')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')

const logger = require('./loggerMiddleware')
const loginRouter = require('./controllers/login.js')

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

app.use(logger)

// app.get('/', (req, res) => {
//  res.send('<h1>Hello world!</h1>')
// })

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)
app.use(handleErrors)

module.exports = { app, server }
