import { IUser } from '@models/index'
export default interface IUserSigninCredentials extends Pick<IUser, 'email' | 'password'> {}
