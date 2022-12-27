import { NgModule, isDevMode } from '@angular/core'
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
import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from './app.effects'
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
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AppEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
