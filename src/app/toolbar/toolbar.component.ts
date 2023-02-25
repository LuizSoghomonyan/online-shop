import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  languageActionENG,
  languageActionRUS,
} from '../store/language-store/language.action'
import { NavigationEnd, Router } from '@angular/router'
import { map, Observable, of, takeUntil } from 'rxjs'
import { MessageService } from '../shared/services/message.service'
import { LanguageEnum } from '../shared/models/language.enum'
import { LanguageService } from '../shared/services/language.service'
import { AbstractDestructionSubject } from '../abstract-destruction-subject'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent extends AbstractDestructionSubject {
  isLoginPage: Observable<boolean>
  messages: Map<string, string> = new Map<string, string>()
  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    super()
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url == '/login') {
          this.isLoginPage = of(true)
        } else this.isLoginPage = of(false)
      }
    })
    this.isLoginPage = of(false)

    this.languageService
      .getLanguage()
      .pipe(
        takeUntil(this.destroySubject$),
        map((data: string) => {
          this.messageService
            .getMessages(
              'user',
              data == 'eng' ? LanguageEnum.ENG : LanguageEnum.RUS
            )
            .pipe(
              takeUntil(this.destroySubject$),
              map((data) => {
                this.messages = data
              })
            )
            .subscribe()
        })
      )
      .subscribe()
  }

  changeLanguageToENG() {
    this.store.dispatch(languageActionENG({ language: 'eng' }))
  }

  changeLanguageToRU() {
    this.store.dispatch(languageActionRUS({ language: 'ru' }))
  }
}
