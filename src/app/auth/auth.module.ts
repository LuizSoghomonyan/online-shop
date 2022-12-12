import { NgModule } from '@angular/core'
import { LoginPageComponent } from './login-page/login-page.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { SignUpComponent } from './sign-up/sign-up.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignUpComponent },
]

@NgModule({
  declarations: [LoginPageComponent, SignUpComponent],
  imports: [RouterModule.forChild(routes), SharedModule, AngularFireAuthModule],
  exports: [LoginPageComponent],
})
export class AuthModule {}
