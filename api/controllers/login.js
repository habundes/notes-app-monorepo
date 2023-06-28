const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  // try {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: 'Invalid user or password' })
  } else {
    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.JWT_SIGNATURE, { expiresIn: 60 * 60 * 7 })

    res.send({
      name: user.name,
      username: user.username,
      token
    })
  }

  // } catch (error) {
  //     console.error({ error });
  // }
})

module.exports = loginRouter
