import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../auth/services/auth.service'
import { MessageService } from '../shared/services/message.service'
import { LanguageService } from '../shared/services/language.service'
import { DataService } from '../data/services/data.service'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { FirebaseService } from '../../firebase/firebase.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthService,
    MessageService,
    LanguageService,
    DataService,
    AngularFirestore,
    FirebaseService,
  ],
})
export class CoreModule {
  //Основной модуль должен быть импортирован только из корневого модуля,
  // поэтому мы добавляем условие внутри конструктора для его проверки.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      )
    }
  }
}
