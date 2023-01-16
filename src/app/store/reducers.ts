import { LanguageStateInterface } from './language-store/language.state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import {
  languageActionENG,
  languageActionRUS,
} from './language-store/language.action'

const initialState: LanguageStateInterface = {
  language: 'eng',
}
const languageReducer = createReducer(
  initialState,
  on(
    languageActionENG,
    (state): LanguageStateInterface => ({
      ...state,
      language: 'eng',
    })
  ),
  on(
    languageActionRUS,
    (state): LanguageStateInterface => ({
      ...state,
      language: 'ru',
    })
  )
)

export function languadereducers(
  state: LanguageStateInterface,
  action: Action
) {
  return languageReducer(state, action)
}
