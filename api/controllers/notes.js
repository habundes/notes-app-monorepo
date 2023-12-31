const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(notes)
})

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  // const ids = notes.map(n => n.id)
  // const maxId = Math.max(...ids)
  const { content, important = false } = req.body
  console.log('Content: ', content)

  const { userId } = req
  // get userId from request
  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({ error: 'Note Content is missing' })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()

    user.notes = [...user.notes, savedNote._id]
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  const newNoteInfo = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
})

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params
  await Note.findByIdAndDelete(id)
  res.status(204).end()
  // .then(() => {
  //     res.status(204).end()
  // })
  // .catch(err => {
  //     next(err)
  // })
})

module.exports = notesRouter
