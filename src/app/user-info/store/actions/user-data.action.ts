import { createAction, props } from '@ngrx/store'
import { UserDataActionTypes } from '../../models/user-data.action.types'
import { UserDataInterface } from '../../models/user-data.interface'

export const userDataAction = createAction(
  UserDataActionTypes.UserData,
  props<{ userData: UserDataInterface }>
)
