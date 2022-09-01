const Register = require('../../models/register')
const { STATUS_TYPES } = require('../../constants/constants')
const mongoose = require('mongoose')

const createRegister = data => {
  return Register.create(data)
}

const findByIdAndUpdateRegisterForCreate = (id, data) => {
  return Register.findByIdAndUpdate(id, data)
}

const findByIdAndUpdateRegister = async (id, data) => {
  const deletedReliableIdArr = data['deleteReliableId']
  const reliableInCompanyArr = data['reliableInCompany']

  let reliableRegisters = []
  debugger
  for (let customerId of deletedReliableIdArr) {
    const customer = await Register.findById(customerId)
    customer.reliableRegisters = customer.reliableRegisters.filter(reliable => reliable.reliableId.toString() !== id)
    Register.findByIdAndUpdate(customerId, customer)
  }

  for (let reliable of reliableInCompanyArr) {
    const reliableId = reliable._id
    const relativeType = {
      relativeTypeId: mongoose.Types.ObjectId(reliable.relativeType._id),
      fromOrTo: 0
    }

    reliableRegisters.push({ reliableId: mongoose.Types.ObjectId(reliableId), relativeType })
  }

  if (reliableRegisters.length) {
    data.reliableRegisters = [...data.reliableRegisters, ...reliableRegisters]
  }

  for (let reliableRegister of reliableRegisters) {
    const customerId = reliableRegister.reliableId
    const relativeTypeId = reliableRegister.relativeType.relativeTypeId
    await Register.findByIdAndUpdate(customerId, {
      $push: {
        reliableRegisters: {
          reliableId: mongoose.Types.ObjectId(id),
          relativeType: {
            relativeTypeId: mongoose.Types.ObjectId(relativeTypeId),
            fromOrTo: 1
          }
        }
      }
    })
  }

  //TODO
  let bugIndex = data.reliableRegisters.findIndex({
    relativeType: {}
  })
  data.reliableRegisters.splice(bugIndex)

  return await Register.findByIdAndUpdate(id, data)
}

const findRegisterById = async (id, populate = '') => {
  return Register.findById(id)
}

const findRegister = (query = {}, populate = '') => {
  return Register.find(query).populate(populate).sort({ createdAt: -1 }).lean().exec()
}

const findRegisterWithFiltersAndPopulate = ({ search, size, status }) => {
  // const pipeline = []
  // const match = { $match: {} }
  // if (search && search !== 'undefined') {
  //   match.$match.$or = [
  //     { firstname: { $regex: search, $options: 'i' } },
  //     { lastname: { $regex: search, $options: 'i' } },
  //     { email: { $regex: search, $options: 'i' } },
  //     { phone: { $regex: search, $options: 'i' } }
  //   ]
  // }

  // if (status && status !== '-9') {
  //   match.$match.status = { $eq: +status }
  // }
  // pipeline.push(match)
  // pipeline.push(
  //   {
  //     $lookup: {
  //       from: 'refferedbies',
  //       localField: 'refferedBy',
  //       foreignField: '_id',
  //       as: 'refferedBy'
  //     }
  //   },
  //   {
  //     $unwind: {
  //       path: '$refferedBy',
  //       preserveNullAndEmptyArrays: true
  //     }
  //   }
  // )
  // pipeline.push({ $sort: { createdAt: -1 } })
  // if (size) {
  //   pipeline.push({ $limit: +size })
  // }
  // return Register.aggregate(pipeline).exec()
  return Register.find()
}

const findActiveRegistersAndPopulateSalarySetting = () => {
  return Register.aggregate([
    { $match: { status: { $eq: STATUS_TYPES.ACTIVE } } },
    { $lookup: { from: 'salarysettings', localField: '_id', foreignField: 'owner', as: 'salarySetting' } }
  ]).exec()
}

module.exports = {
  createRegister,
  findByIdAndUpdateRegister,
  findRegisterById,
  findRegister,
  findRegisterWithFiltersAndPopulate,
  findActiveRegistersAndPopulateSalarySetting,

  findByIdAndUpdateRegisterForCreate
}
