const joi = require('joi')
const utils = require('../../../utils')

const statusUpdateValidation = async (req, res, next) => {
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
  statusUpdateValidation
}
