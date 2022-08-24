export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, state: any, callback) => {
  callback({ ...state, [event.target.name]: event.target.value })
}
