import { IOption } from '../models'

export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, state: any, callback) => {
  callback({ ...state, [event.target.name]: event.target.value })
}

export const handleSelectChange = (option: IOption, name: string, state: any, callback) => {
  callback({ ...state, [name]: option.value })
}

export const handleDateChange = (dateText: string, name: string, state: any, callback) => {
  callback({ ...state, [name]: dateText })
}
