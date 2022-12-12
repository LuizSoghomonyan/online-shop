import { Component, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { User, emptyUser } from '../models/user'
import { Router } from '@angular/router'
import firebase from 'firebase/compat'
import { UserNotFound } from '../../custom-exception/UserNotFound/user-not-found'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form: FormGroup
  userData: User
  public showNotFoundUserError: boolean
  constructor(
    public authService: AuthService,
    private router: Router,
    private elRef: ElementRef
  ) {
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
      .subscribe(
        (user: User | undefined) => {
          if (user) {
            this.authService.getCurrentUserData()
            this.router.navigate(['home'])
          } else {
            this.showNotFoundUserError = true
          }
        },
        () => {
          this.showNotFoundUserError = true
        }
      )
  }

  logInWithGoogle() {
    if (this.form.valid) {
      this.authService
        .logInWithGoogle()
        .subscribe((res: firebase.auth.UserCredential | undefined) => {
          this.authService.getCurrentUserData()
          //User is new, redirect to register page
          if (
            res &&
            res.additionalUserInfo &&
            res.additionalUserInfo.isNewUser
          ) {
            console.log(res)
            // this.elRef.nativeElement.querySelector('form').submit
            this.router.navigate(['register'])
          }
          //user is register in app
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
    }
  }
}
