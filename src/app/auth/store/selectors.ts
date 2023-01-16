import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../../store/app.state.interface'
import { AuthStateInterface } from './models/auth.state.interface'

export const selectAuthFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth')

export const selectIsLoginSelector = createSelector(
  selectAuthFeatureSelector,
  (authState) => authState.isLogin
)
