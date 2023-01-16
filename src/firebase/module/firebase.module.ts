import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../../environments/environment'
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore'
import { FirebaseService } from '../firebase.service'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService, AngularFirestore],
})
export class FirebaseModule {}
