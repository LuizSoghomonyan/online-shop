import { Component, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { emptyUser, User } from '../../models/user'
import { Router } from '@angular/router'
import firebase from 'firebase/compat'
import { UserNotFound } from '../../../custom-exception/UserNotFound/user-not-found'
import { Store } from '@ngrx/store'
import { loginAction } from '../../store/actions/login.action'
import { LoginActionInterface } from '../../models/loginAction.interface'
import { LoginTypesEnum } from '../../models/loginTypes.enum'
import { map, takeUntil } from 'rxjs'
import { AbstractDestructionSubject } from '../../../abstract-destruction-subject'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent extends AbstractDestructionSubject {
  form: FormGroup
  userData: User
  public showNotFoundUserError: boolean
  constructor(
    public authService: AuthService,
    private router: Router,
    private elRef: ElementRef,
    private store: Store
  ) {
    super()
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
    this.userData = emptyUser()
    this.showNotFoundUserError = false
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
            const loginActionInterface: LoginActionInterface = {
              email: this.form.controls['email'].value,
              password: this.form.controls['password'].value,
              loginType: LoginTypesEnum.LOGIN_WITH_EMAIL,
            }
            this.store.dispatch(loginAction({ user: loginActionInterface }))
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
        .logInWithGoogle()
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
          (res) => {
            const loginActionInterface: LoginActionInterface = {
              email: this.form.controls['email'].value,
              password: this.form.controls['password'].value,
              loginType: LoginTypesEnum.LOGIN_WITH_GOOGLE,
            }
            this.store.dispatch(loginAction({ user: loginActionInterface }))
          },
          (err) => {
            console.error(err)
            this.showNotFoundUserError = true
          }
        )
    }
  }
}
