import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  languageActionENG,
  languageActionRUS,
} from '../store/language-store/language.action'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private store: Store) {}

  changeLanguageToENG() {
    this.store.dispatch(languageActionENG({ language: 'eng' }))
  }

  changeLanguageToRU() {
    this.store.dispatch(languageActionRUS({ language: 'ru' }))
  }
}
