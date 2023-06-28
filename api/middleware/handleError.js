const ERROR_HANDLERS = {
  CastError: (res, err) => res.status(400).send({ error: err.message }),
  ValidationError: (res, err) => res.status(409).send({ error: err.message }),
  JsonWebTokenError: res => res.status(401).json({ error: 'Note Content is missing' }),
  TokenExpiredError: (res, err) => res.status(401).json({ error: err.message }),
  defaultError: res => res.status(500).end()
}

module.exports = (err, req, res, next) => {
  console.log('Handle errors: ', err.name, err.message)
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
  // if (err.name === 'CastError') {
  //     res.status(400).send({ error: err.message })
  // } else if (error.name === 'ValidationError') {
  //     res.status(409).send({ error: err.message })
  // } else if (error.name === 'JsonWebTokenError') {
  //     res.status(401).json({ error: 'Note Content is missing' })
  // } else {
  //     res.status(500).end()
  // }
}
