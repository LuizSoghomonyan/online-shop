import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component'
import { RouterModule } from '@angular/router'
import { MessageService } from './services/message.service'
import { FirebaseModule } from '../../firebase/module/firebase.module'
import { LanguageService } from './services/language.service'
import { DataService } from '../data/services/data.service'

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FirebaseModule,
  ],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [],
})
export class SharedModule {}
