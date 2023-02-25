import { Injectable } from '@angular/core'
import { AuthService } from '../../auth/services/auth.service'
import { UserDataInterface } from '../models/user-data.interface'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthService) {}

  public getCurrentUserData() {
    return this.authService.getFirebaseUser().pipe(
      map((data) => {
        const userData: UserDataInterface = { displayName: '', email: '' }
        if (
          typeof data?.displayName === 'string' &&
          typeof data?.displayName === 'string'
        ) {
          userData.displayName = data?.displayName
        }
        if (typeof data?.photoURL === 'string') {
          userData.photoURL = data?.photoURL
        }
        if (typeof data?.email === 'string') {
          userData.email = data?.email
        }
        return userData
      })
    )
  }
  public updateProfile(displayName: string, photoURL?: string) {
    this.authService.getFirebaseUser().subscribe((data) => {
      data
        ?.updateProfile({
          displayName: displayName,
          photoURL: photoURL,
        })
        .catch((err) => console.error)
    })
  }
}
