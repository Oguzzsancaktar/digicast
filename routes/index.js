const express = require('express')
const router = express.Router()

//ROUTES
const authRoutes = require('./auth-routes/authRoutes')
const registerRoutes = require('./register-routes/registerRoutes')

router.all('/api')
router.use('/auth', authRoutes)
router.use('/register', registerRoutes)

module.exports = router
