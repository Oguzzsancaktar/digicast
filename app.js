const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')

const routes = require('./routes')

const app = express()

const URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

const main = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message)
  }

  app.use(express.json())
  app.use(cookieParser())
  app.use(helmet())
  app.use(cors())
  app.use(morgan('dev'))

  app.use('/api', routes)

  // error handler
  app.use(function (err, req, res, next) {
    console.log(err)
    res.sendStatus(err.status || 500)
  })

  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
  })

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

main().then(() => console.log('SUCCESS STARTING SERVER'))
