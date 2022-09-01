const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post(
  '/login',
  middlewares.validations.authValidations.loginValidation,
  controllers.authController.loginController
)
router.post(
  '/signup',
  middlewares.validations.authValidations.signupValidation,
  controllers.authController.signupController
)

router.delete('/logout', middlewares.authMiddlewares.checkAuth, controllers.authController.logoutController)

module.exports = router
