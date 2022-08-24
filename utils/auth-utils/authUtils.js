const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = async ({ plainTextPassword }) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plainTextPassword, salt)
}

const comparePassword = ({ plainTextPassword, hashedPassword }) => {
  return bcrypt.compare(plainTextPassword, hashedPassword)
}

const generateTokens = async ({ userId, role }) => {
  const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s'
  })

  const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '60d'
  })
  return { accessToken, refreshToken }
}

module.exports = {
  comparePassword,
  hashPassword,
  generateTokens
}
