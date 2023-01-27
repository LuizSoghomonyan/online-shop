import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from './models/auth.state.interface'

export const selectAuthFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth')

export const selectIsLoginSelector = createSelector(
  selectAuthFeatureSelector,
  (authState) => authState.isLogin
)

export const selectCurrentUser = createSelector(
  selectAuthFeatureSelector,
  (authState) => authState.currentUser
)
