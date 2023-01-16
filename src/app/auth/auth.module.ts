import { NgModule } from '@angular/core'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { AngularFirestore } from '@angular/fire/compat/firestore'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignUpComponent },
]

@NgModule({
  declarations: [LoginPageComponent, SignUpComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    AngularFireAuthModule,
    StoreModule.forFeature('auth', reducers),
  ],
  exports: [LoginPageComponent],
  providers: [AngularFirestore],
})
export class AuthModule {}
