const express = require('express')
const router = express.Router()

//ROUTES
const authRoutes = require('./auth-routes/authRoutes')

router.use('/auth', authRoutes)

module.exports = router
