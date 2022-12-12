import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { from, Observable } from 'rxjs'
import { emptyUser, User } from './models/user'
import firebase from 'firebase/compat/app'
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider
import { UserNotFound } from '../custom-exception/UserNotFound/user-not-found'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.userData = emptyUser()
  }

  //return provider for all login methods
  getProvider(loginMethodName = 'google') {
    if (loginMethodName === 'google') return new GoogleAuthProvider()
    else return new GoogleAuthProvider()
  }

  public logIn(email: string, password: string): Observable<User | undefined> {
    return from(
      this.firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) return this.userDtoConvertToUser(result.user)
          return undefined
        })
    )
  }

  public logInWithGoogle(): Observable<
    firebase.auth.UserCredential | undefined
  > {
    return from(
      this.firebaseAuth
        .signInWithPopup(this.getProvider('google'))
        .then((result) => {
          if (result) return result
          return undefined
        })
        .catch(() => {
          throw new UserNotFound('User Not Found')
        })
    )
  }

  private userDtoConvertToUser(user: firebase.User): User {
    this.userData.id = user.uid
    this.userData.email = user.email || ''
    this.userData.displayName = user.displayName || ''
    this.userData.emailVerified = user.emailVerified
    return this.userData
  }

  public signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    return from(
      this.firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res: firebase.auth.UserCredential) => {
          // console.log(res?.user);
          if (res.user) {
            res.user.updateProfile({ displayName: firstname + ' ' + lastname })
          }
        })
    )
  }

  public getCurrentUserData() {
    this.firebaseAuth.user.subscribe((x) => console.log(x))
  }
}
