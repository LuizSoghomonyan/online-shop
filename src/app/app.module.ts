import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FirebaseModule } from '../firebase/module/firebase.module'
import { TestComponent } from './test/test.component'
import { FirebaseService } from '../firebase/firebase.service'
import { RouterModule } from '@angular/router'
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthModule } from './auth/auth.module'

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    FirebaseModule,
    AppRoutingModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
