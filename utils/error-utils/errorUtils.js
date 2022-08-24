const errorInstance = ({ message, validationError }) => {
  return {
    error: message,
    validationError
  }
}

module.exports = {
  errorInstance
}
