const mongoose = require('mongoose')
const { Schema } = mongoose

const registerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = Register = mongoose.model('register', registerSchema)
