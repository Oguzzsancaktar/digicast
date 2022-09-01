const dataAccess = require('../../data-access')
const utils = require('../../utils')
const constants = require('../../constants')
const { AUTH_COOKIE_OPTIONS } = require('../../constants/constants')
const { LOG_TYPES } = require('../../constants/log')

const loginController = async (req, res) => {
  const { body } = req
  const { username, password } = body

  const user = await dataAccess.authDataAccess.findUserByUsername({ username })

  if (!user) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User not found' }))
  }

  const isPasswordValid = await utils.authUtils.comparePassword({
    plainTextPassword: password,
    hashedPassword: user.password
  })

  if (!isPasswordValid) {
    return res.status(400).json(utils.errorUtils.errorInstance({ message: 'Invalid password' }))
  }

  const { accessToken, refreshToken } = await utils.authUtils.generateTokens({
    userId: user._id.toString()
  })

  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY, accessToken, AUTH_COOKIE_OPTIONS)
  res.cookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_REFRESH_KEY, refreshToken, AUTH_COOKIE_OPTIONS)

  res.send({
    userId: user._id.toString(),
    accessToken,
    refreshToken
  })
}

const signupController = async (req, res) => {
  const { body } = req
  try {
    const user = await dataAccess.authDataAccess.findUserByUsername({ username: body.username })

    if (user) {
      return res.status(400).json(utils.errorUtils.errorInstance({ message: 'User already exists' }))
    }

    const hashedPassword = await utils.authUtils.hashPassword({ plainTextPassword: body.password })
    const newUser = await dataAccess.authDataAccess.createUser({ ...body, password: hashedPassword })

    res.status(201).json({ user: newUser })
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error creating user' }))
  }
}

const logoutController = async (req, res) => {
  try {
    res.clearCookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_ACCESS_KEY)
    res.clearCookie(constants.tokenConstants.TOKEN_ACCESS_KEYS.USER_REFRESH_KEY)
    await dataAccess.timeLogDataAccess.createTimeLog({ logType: LOG_TYPES.LOGOUT, owner: req.user.userId })
    res.send({ message: 'Logout successful' })
  } catch (e) {
    console.log(e)
    res.status(500).json(utils.errorUtils.errorInstance({ message: 'Error logging out' }))
  }
}

module.exports = {
  loginController,
  signupController,
  logoutController
}
