import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LanguageStateInterface } from './language.state.interface'

export const selectlanguageFeatureSelector =
  createFeatureSelector<LanguageStateInterface>('shared')

export const selectLanguage = createSelector(
  selectlanguageFeatureSelector,
  (languageState) => languageState.language
)
