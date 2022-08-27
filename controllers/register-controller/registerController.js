const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

const createRegister = async (req, res) => {
  const { body } = req

  try {
    const createdRegister = await dataAccess.registerDataAccess.createRegister(body)
    res.status(StatusCodes.CREATED).json(createdRegister)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRegisters = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const registers = await dataAccess.registerDataAccess.findRegisterWithFiltersAndPopulate({ search, size, status })
    res.status(StatusCodes.OK).json(registers)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRegister = async (req, res) => {
  const { id } = req.params
  try {
    const register = await dataAccess.registerDataAccess.findRegisterById(id, 'refferedBy')
    res.status(StatusCodes.OK).json(register)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateRegister = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.registerDataAccess.findByIdAndUpdateRegister(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeRegister = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.registerDataAccess.findByIdAndUpdateRegister(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRegisterReliablesWithId = async (req, res) => {
  const { id } = req.params
  let reliableRegisterArr = []

  try {
    const register = await dataAccess.registerDataAccess.findRegisterById(id)
    if (register) {
      for (let i = 0; i < register.reliableRegisters.length; i++) {
        const reliableRegister = await dataAccess.registerDataAccess.findRegisterById(
          register.reliableRegisters[i].reliableId,
          'refferedBy'
        )
        reliableRegisterArr.push(reliableRegister)
      }
    }

    res.status(StatusCodes.OK).json(reliableRegisterArr)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createRegister,
  getRegisters,
  removeRegister,
  getRegister,
  updateRegister,
  getRegisterReliablesWithId
}
