import { Component, ElementRef, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { emptyUser, User } from '../../models/user'
import { Router } from '@angular/router'
import firebase from 'firebase/compat/app'
import { UserNotFound } from '../../../custom-exception/UserNotFound/user-not-found'
import { Store } from '@ngrx/store'
import { map, NEVER, Observable, takeUntil } from 'rxjs'
import { AbstractDestructionSubject } from '../../../abstract-destruction-subject'
import { MessageService } from '../../../shared/services/message.service'
import { LanguageEnum } from '../../../shared/models/language.enum'
import { LanguageService } from '../../../shared/services/language.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent
  extends AbstractDestructionSubject
  implements OnInit
{
  form: FormGroup
  userData: User
  language: LanguageEnum = LanguageEnum.ENG
  public showNotFoundUserError: boolean
  public messages$: Observable<Map<string, string>> = NEVER
  public messages: Map<string, string> = new Map<string, string>()
  testBool = false

  constructor(
    public authService: AuthService,
    private router: Router,
    private elRef: ElementRef,
    private store: Store,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    super()
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
    this.userData = emptyUser()
    this.showNotFoundUserError = false
    this.authService.isLogIn()
  }
  ngOnInit(): void {
    this.languageService
      .getLanguage()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((elem) => {
        this.messageService
          .getMessages(
            'auth',
            elem === 'eng' ? LanguageEnum.ENG : LanguageEnum.RUS
          )
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((x: Map<string, string>) => {
            this.messages = x
            this.testBool = true
          })
      })
  }
  logIn() {
    this.authService
      .logIn(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .pipe(
        takeUntil(this.destroySubject$),
        map((user: User | undefined) => {
          if (user) {
            this.router.navigate(['home'])
          } else {
            this.showNotFoundUserError = true
          }
        })
      )

      .subscribe(undefined, () => {
        this.showNotFoundUserError = true
      })
  }

  logInWithGoogle() {
    if (this.form.valid) {
      this.authService
        .logInWithGoogle(
          this.form.controls['email'].value,
          this.form.controls['password'].value
        )
        .pipe(
          takeUntil(this.destroySubject$),
          map((res: firebase.auth.UserCredential | undefined) => {
            //if User is new, redirect to register page
            if (
              res &&
              res.additionalUserInfo &&
              res.additionalUserInfo.isNewUser
            ) {
              this.router.navigate(['register'])
            }
            //user already exists
            else if (
              res &&
              res.additionalUserInfo &&
              !res.additionalUserInfo.isNewUser
            ) {
              this.router.navigate(['home'])
            } else {
              throw new UserNotFound('User Not Found')
            }
          })
        )

        .subscribe(
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          () => {},
          (err) => {
            console.error(err)
            this.showNotFoundUserError = true
          }
        )
    }
  }
}
