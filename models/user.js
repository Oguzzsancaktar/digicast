const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    username: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    }
  },
  { timestamps: true }
)

module.exports = User = mongoose.model('user', UserSchema)
