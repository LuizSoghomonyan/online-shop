import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserStateInterface } from '../models/user.state.interface'

export const selectUserFeatureSelector =
  createFeatureSelector<UserStateInterface>('user')

export const selectUserDataDisplayName = createSelector(
  selectUserFeatureSelector,
  (state) => state.userData.displayName
)

export const selectUserDataPhotoURL = createSelector(
  selectUserFeatureSelector,
  (state) => state.userData.photoURL
)
