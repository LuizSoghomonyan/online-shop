import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { messages } from '../../models/messages'
import { Router } from '@angular/router'
import { map, takeUntil } from 'rxjs'
import { AbstractDestructionSubject } from '../../../abstract-destruction-subject'
import { Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'
import { RegisterActionInterface } from '../../store/models/register.action.interface'
import { MessageService } from '../../../shared/services/message.service'
import { LanguageEnum } from '../../../shared/models/language.enum'
import { LanguageService } from '../../../shared/services/language.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent
  extends AbstractDestructionSubject
  implements OnInit
{
  form: FormGroup
  signUpError = ''
  hasErrorMessage = false
  messages: Map<string, string> = new Map<string, string>()

  constructor(
    public authService: AuthService,
    public route: Router,
    private store: Store,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    super()
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
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
          })
      })
  }

  signUp() {
    this.authService
      .signUp(
        this.form.controls['firstname'].value,
        this.form.controls['lastname'].value,
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .pipe(
        takeUntil(this.destroySubject$),
        map(() => {
          const registerActionInterface: RegisterActionInterface = {
            firstname: this.form.controls['firstname'].value,
            lastname: this.form.controls['lastname'].value,
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value,
          }
          this.store.dispatch(registerAction({ user: registerActionInterface }))
        })
      )
      .subscribe(
        () => {
          this.route.navigate(['home'])
        },
        (error) => {
          if (error) {
            const code: string = error.code.toString()
            this.signUpError = messages[code]
            this.hasErrorMessage = true
          } else {
            this.hasErrorMessage = false
          }
        }
      )
  }
}
