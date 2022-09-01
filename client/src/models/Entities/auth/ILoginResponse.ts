import IUser from '../user/IUser'

export default interface ILoginResponse {
  userId: IUser['_id']
  accessToken: string
  refreshToken: string
}
