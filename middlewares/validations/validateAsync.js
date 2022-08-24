const utils = require('../../utils')

const validateAsync = async ({ schema, data }, req, res, next) => {
  try {
    await schema.validateAsync(data)
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

module.exports = validateAsync
