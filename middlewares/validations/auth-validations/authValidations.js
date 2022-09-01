const joi = require('joi')
const utils = require('../../../utils')

const loginValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi
    .object({
      username: joi.string().required(),
      password: joi.string().min(4).required()
    })
    .options({ abortEarly: false })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(utils.errorUtils.errorInstance({ message: error.message, validationError: error.details }))
  }
}

const signupValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi
    .object({
      username: joi.string().min(3).max(30).required(),
      password: joi.string().min(6).required()
    })
    .options({ abortEarly: false })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(utils.errorUtils.errorInstance({ message: error.message, validationError: error.details }))
  }
}

module.exports = {
  loginValidation,
  signupValidation
}
