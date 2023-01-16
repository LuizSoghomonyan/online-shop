import { AuthStateInterface } from './models/auth.state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import { loginAction } from './actions/login.action'
import { registerAction } from './actions/register.action'

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
    })
  ),
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isRegistered: true,
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
