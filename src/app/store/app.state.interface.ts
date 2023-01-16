import { AuthStateInterface } from '../auth/store/models/auth.state.interface'
import { LanguageStateInterface } from './language-store/language.state.interface'

export interface AppStateInterface {
  auth: AuthStateInterface
  shared: LanguageStateInterface
}
