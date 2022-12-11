import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public firestore: AngularFirestore) {}

  public getTestData() {
    console.log('getTestData')
    return this.firestore.collection('test').valueChanges()
  }
}
