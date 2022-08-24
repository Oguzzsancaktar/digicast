const joi = require('joi')
const utils = require('../../../utils')
const { GENDERS, STATUSES } = require('../../../constants/constants')

const loginValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi
    .object({
      email: joi.string().email().required().email(),
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

const registerValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi
    .object({
      email: joi.string().email().required().email(),
      password: joi.string().min(6).required(),
      firstName: joi.string().min(3).max(30).required(),
      lastName: joi.string().min(3).max(30).required(),
      birthday: joi.date().required(),
      phone: joi.string().required(),
      country: joi.string().required(),
      city: joi.string().min(3).max(30).required(),
      state: joi.string().min(3).max(30).required(),
      street: joi.string().min(3).max(30).required(),
      zipCode: joi.string().min(3).max(30).required(),
      gender: joi.number().min(0).max(2).required(),
      status: joi.number().min(0).max(1).required(),
      role: joi.number().required()
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
  registerValidation
}
