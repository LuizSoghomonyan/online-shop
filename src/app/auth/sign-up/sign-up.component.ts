import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { messages } from '../messages'
import { Router } from '@angular/router'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  form: FormGroup
  signUpError = ''
  hasErrorMessage = false

  constructor(public authService: AuthService, public route: Router) {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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
      .subscribe(
        () => {
          this.authService.getCurrentUserData()
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
