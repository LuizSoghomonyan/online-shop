import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../action.types'
import { LoginActionInterface } from '../../models/loginAction.interface'

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ user: LoginActionInterface }>()
)
