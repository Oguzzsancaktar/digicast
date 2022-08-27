const joi = require('joi')
const utils = require('../../../utils')

const registerValidationSchema = {
  fullname: joi.string().required(),
  phone: joi.string().required(),
  email: joi.string().required(),
  city: joi.string().required(),
  birthday: joi.string().required()
}

const createRegisterValidation = async (req, res, next) => {
  const { body } = req
  const schema = joi.object({ ...registerValidationSchema })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

const updateRegisterValidation = async (req, res, next) => {
  const { body } = req

  const schema = joi.object({
    ...registerValidationSchema,
    _id: joi.string().required(),
    reliableRegisters: joi.array().required(),
    deleteReliableId: joi.array().required()
  })

  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

const getRegisterValidation = async (req, res, next) => {
  const { params } = req
  const schema = joi.object({
    id: joi.string().required()
  })

  try {
    await schema.validateAsync(params)
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

const statusUpdateRegisterValidation = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  const schema = joi.object({ id: joi.string().required(), status: joi.number().required() })

  try {
    await schema.validateAsync({ id, status })
    next()
  } catch (error) {
    res.status(400).json(
      utils.errorUtils.errorInstance({
        message: error.message,
        validationError: error.details
      })
    )
  }
}

module.exports = {
  createRegisterValidation,
  updateRegisterValidation,
  getRegisterValidation,
  statusUpdateRegisterValidation
}
