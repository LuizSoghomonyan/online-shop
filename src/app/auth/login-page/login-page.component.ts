import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User, emptyUser } from "../models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  userData: User;
  public showNotFoundUserError: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      }
    )
    this.userData = emptyUser();
    this.showNotFoundUserError = false;
  }

  ngOnInit(): void {
  }

  logIn() {
    //todo isValid
    this.authService.logIn(this.form.controls['email'].value, this.form.controls['password'].value)
      .subscribe((user: User | undefined) => {
          if(user){
            this.router.navigate(['home'])
          }else {
            this.showNotFoundUserError = true;
          }
      }, () => {this.showNotFoundUserError = true;})

  }
}
