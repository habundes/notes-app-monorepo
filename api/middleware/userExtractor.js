const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SIGNATURE)

  if (!token || !decodedToken.id) {
    res.status(401).json({ error: 'Missing or invalid token ' })
  }

  const { id: userId } = decodedToken
  req.userId = userId
  next()
}
