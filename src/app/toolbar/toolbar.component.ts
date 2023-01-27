import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  languageActionENG,
  languageActionRUS,
} from '../store/language-store/language.action'
import { NavigationEnd, Router } from '@angular/router'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  isLoginPage: Observable<boolean>
  constructor(private store: Store, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url == '/login') {
          this.isLoginPage = of(true)
        } else this.isLoginPage = of(false)
      }
    })
    this.isLoginPage = of(false)
  }

  changeLanguageToENG() {
    this.store.dispatch(languageActionENG({ language: 'eng' }))
  }

  changeLanguageToRU() {
    this.store.dispatch(languageActionRUS({ language: 'ru' }))
  }
}
