import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs'
import { LanguageEnum } from '../models/language.enum'
import { MessageInterface } from '../models/message.interface'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private db: AngularFirestore) {}

  getMessages(
    moduleName: string,
    languageId: LanguageEnum
  ): Observable<Map<string, string>> {
    const returnMap = new Map<string, string>()
    return this.db
      .collection<MessageInterface>('message', (res) =>
        res.where('moduleName', '==', moduleName)
      )
      .valueChanges()
      .pipe(
        map((message) => {
          console.log('message', message)
          message.forEach((elem) => {
            if (elem) returnMap.set(elem['key'], elem['messages'][languageId])
          })
          return returnMap
        })
      )
  }
  //id
  // :
  // 1
  // key
  // :
  // "auth/email-already-in-use"
  // messages
  // :
  // {ru: 'Адрес электронной почты уже используется другим аккаунтом.', eng: 'The email address is already in use by another account.'}
  // moduleName
  // :
  // "auth"
}
