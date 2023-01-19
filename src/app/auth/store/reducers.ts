import { AuthStateInterface } from './models/auth.state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import { loginAction } from './actions/login.action'
import { registerAction } from './actions/register.action'
import { AuthService } from '../services/auth.service'

const initialState: AuthStateInterface = {
  isLogin: false,
  isRegistered: false,
}
const authReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isLogin: true,
      currentUser: AuthService.getCurrentUserData(),
    })
  ),
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isRegistered: true,
      currentUser: AuthService.getCurrentUserData(),
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
