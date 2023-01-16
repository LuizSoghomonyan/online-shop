import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../models/action.types'
import { RegisterActionInterface } from '../models/register.action.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ user: RegisterActionInterface }>()
)
