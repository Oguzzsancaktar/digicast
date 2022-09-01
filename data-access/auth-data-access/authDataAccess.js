const User = require('../../models/user')

const findUserByUsername = ({ username }) => {
  return User.findOne({ username })
}

const createUser = data => {
  return User.create({ ...data })
}

module.exports = {
  findUserByUsername,
  createUser
}
