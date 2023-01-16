import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../models/action.types'
import { LoginActionInterface } from '../models/login.action.interface'

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ user: LoginActionInterface }>()
)
