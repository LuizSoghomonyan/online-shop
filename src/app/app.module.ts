import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FirebaseModule } from '../firebase/module/firebase.module'
import { TestComponent } from './test/test.component'
import { RouterModule } from '@angular/router'
import { MaterialModule } from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app.routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthModule } from './auth/auth.module'
import { StoreModule } from '@ngrx/store'
import { metaReducers, reducers } from './reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from './app.effects'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { languadereducers } from './store/reducers'
import { HomeComponent } from './data/components/home/home.component'
import { ControlsModule } from './shared/components/controls.module'
import { ProductModule } from './data/modules/product.module'

@NgModule({
  declarations: [AppComponent, TestComponent, ToolbarComponent, HomeComponent],
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
    StoreModule.forFeature('shared', languadereducers),
    ControlsModule,
    ProductModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
