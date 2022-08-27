import { EValidationFiedTypes, IValidationItem } from '../models'

const controlStringLength = (value: string): boolean => {
  const minNum = 6
  const result = value.trim().length >= minNum
  return result
}

export const isValueNotNull = (value: string | undefined) => {
  if (value) {
    return value.toString().trim().length > 0
  } else {
    return false
  }
}

export const isValueBiggerThanZero = (value: number) => {
  return +value > 0
}

export const isUsernameValid = (username: string): boolean => {
  const result = controlStringLength(username)
  return result
}

export const isPhoneNumberValid = (phone: string) => {
  var phoneRegex = /^\d{10}$/
  return phone.match(phoneRegex)
}

export const isEmailValid = (email: string): boolean => {
  const result = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

  return result !== null ? true : false
}

export const isZipcodeValid = (zipcode: string) => {
  var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  return zipcode.match(zipRegex)
}

export const isPasswordValid = (password: string): boolean => {
  const result = controlStringLength(password)
  return result
}

export const isPasswordAndConfirmMatch = (password: string, passwordConfirm: string): boolean => {
  const _password = password.trim()
  const _passwordConfirm = passwordConfirm.trim()
  const result = _password === _passwordConfirm
  return result
}

export const validateFormFields = (validationOptions: IValidationItem[], validationData: any, callback): boolean => {
  let tempErrors = {}
  validationOptions.map(option => {
    switch (option.fieldType) {
      case EValidationFiedTypes.STRING:
        const result = isValueNotNull(validationData[option.fieldName])
        if (result) {
          tempErrors[option.fieldName + 'Error'] = false
        } else {
          tempErrors[option.fieldName + 'Error'] = true
        }
        break
      case EValidationFiedTypes.EMAIL:
        break
      case EValidationFiedTypes.NUMBER:
        break
      default:
        console.log('Validation type not implemented')
        break
    }
  })

  callback(tempErrors)
  return !Object.values(tempErrors).includes(true)
}
