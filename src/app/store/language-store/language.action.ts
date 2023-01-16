import { createAction, props } from '@ngrx/store'
import { LanguageTypes } from '../models/language.types'

export const languageActionENG = createAction(
  LanguageTypes[0],
  props<{ language: string }>()
)

export const languageActionRUS = createAction(
  LanguageTypes[1],
  props<{ language: string }>()
)
