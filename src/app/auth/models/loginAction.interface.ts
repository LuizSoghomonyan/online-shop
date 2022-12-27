import { LoginTypesEnum } from './loginTypes.enum'

export interface LoginActionInterface {
  email: string
  password: string
  loginType: LoginTypesEnum
}
