const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/',
  middlewares.validations.registerValidations.createRegisterValidation,
  controllers.registerController.createRegister
)

router.get('/', controllers.registerController.getRegisters)

module.exports = router
