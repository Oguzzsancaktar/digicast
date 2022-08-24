import { IUser } from '@models/index'
export default interface IUserCreateDTO extends Omit<IUser, '_id' | 'role'> {
  role: string
}
