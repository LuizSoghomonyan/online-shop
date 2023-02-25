import { Action, createReducer, on } from '@ngrx/store'
import { UserStateInterface } from '../models/user.state.interface'
import { userDataAction } from './actions/user-data.action'

const initialState: UserStateInterface = {
  userData: { displayName: '', photoURL: '', email: '' },
}
const userReducer = createReducer(
  initialState,
  on(
    userDataAction,
    (state): UserStateInterface => ({
      ...state,
    })
  )
)

export function reducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action)
}
