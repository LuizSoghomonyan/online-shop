import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component'
import { RouterModule } from '@angular/router'
import { MessageService } from './services/message.service'
import { FirebaseModule } from '../../firebase/module/firebase.module'

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
  providers: [MessageService],
})
export class SharedModule {}
