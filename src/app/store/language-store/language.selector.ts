import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../app.state.interface'
import { LanguageStateInterface } from './language.state.interface'

export const selectlanguageFeatureSelector =
  createFeatureSelector<LanguageStateInterface>('shared')

export const selectLanguage = createSelector(
  selectlanguageFeatureSelector,
  (languageState) => languageState.language
)
