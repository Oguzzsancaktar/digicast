const mongoose = require('mongoose')
const { Schema } = mongoose
const { STATUSES } = require('../constants/constants')
const { mongo } = require('mongoose')

const UserSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    firstname: {
      required: true,
      type: String
    },
    lastname: {
      required: true,
      type: String
    },
    birthday: {
      required: true,
      type: Date
    },
    birthplace: {
      required: true,
      type: String
    },
    phone: {
      required: true,
      type: String
    },
    country: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    },
    state: {
      required: true,
      type: String
    },
    address: {
      required: true,
      type: String
    },
    zipcode: {
      required: true,
      type: String
    },
    gender: {
      required: true,
      type: Number
    },
    status: {
      required: true,
      type: Number,
      default: STATUSES.ACTIVE
    },
    role: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: 'role'
    }
  },
  { timestamps: true }
)

module.exports = User = mongoose.model('user', UserSchema)
