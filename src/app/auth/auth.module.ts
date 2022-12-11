import { NgModule } from '@angular/core'
import { LoginPageComponent } from './login-page/login-page.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { TestComponent } from '../test/test.component'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: TestComponent },
]

@NgModule({
  declarations: [LoginPageComponent],
  imports: [RouterModule.forChild(routes), SharedModule, AngularFireAuthModule],
  exports: [LoginPageComponent],
})
export class AuthModule {}
