import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectLanguage } from '../../store/language-store/language.selector'
import { AppStateInterface } from '../../store/app.state.interface'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private readonly store: Store) {}
  getLanguage() {
    return this.store.select<string>(selectLanguage)
    // .subscribe((x) => console.log(x))
  }
}
