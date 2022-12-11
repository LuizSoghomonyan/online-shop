import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../../environments/environment'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { FirebaseService } from '../firebase.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [FirebaseService],
})
export class FirebaseModule {}
