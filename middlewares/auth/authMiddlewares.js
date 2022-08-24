const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    req.user = jwt.decode(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    return res.status(401).send({
      message: 'Auth failed'
    })
  }
}

module.exports = {
  checkAuth
}
