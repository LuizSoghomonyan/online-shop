import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { catchError, from, map, Observable, of, zip } from 'rxjs'
import { emptyUser, User } from '../models/user'
import { UserNotFound } from '../../custom-exception/UserNotFound/user-not-found'
import { LoginActionInterface } from '../store/models/login.action.interface'
import { LoginTypesEnum } from '../store/models/loginTypes.enum'
import { loginAction } from '../store/actions/login.action'
import { Store } from '@ngrx/store'
import { selectIsLoginSelector } from '../store/selectors'
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: User

  constructor(private firebaseAuth: AngularFireAuth, private store: Store) {
    this.userData = emptyUser()
  }

  //return provider for all login methods
  getProvider(loginMethodName = 'google') {
    if (loginMethodName === 'google')
      return new firebase.auth.GoogleAuthProvider()
    else return new firebase.auth.GoogleAuthProvider()
  }

  public logIn(email: string, password: string): Observable<User | undefined> {
    return from(
      this.firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            this.getExpirationTime()
            const loginActionInterface: LoginActionInterface = {
              email: email,
              password: password,
              loginType: LoginTypesEnum.LOGIN_WITH_EMAIL,
            }
            this.store.dispatch(loginAction({ user: loginActionInterface }))
            return this.userDtoConvertToUser(result.user)
          }
          return undefined
        })
    )
  }

  public logInWithGoogle(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential | undefined> {
    return from(
      this.firebaseAuth
        .signInWithPopup(this.getProvider('google'))
        .then((result) => {
          if (result) {
            const loginActionInterface: LoginActionInterface = {
              email: email,
              password: password,
              loginType: LoginTypesEnum.LOGIN_WITH_GOOGLE,
            }
            this.getExpirationTime()
            this.store.dispatch(loginAction({ user: loginActionInterface }))
            return result
          }
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
    user.getIdTokenResult().then((x) => {
      this.userData.access_token = x.token
    })
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
          if (res.user) {
            res.user
              .updateProfile({ displayName: firstname + ' ' + lastname })
              .then((r) => console.log(r))
          }
        })
    )
  }

  public static getCurrentUserData() {
    return JSON.parse(JSON.stringify(firebase.auth().currentUser))
  }

  public isLogIn(): Observable<boolean> {
    return zip(
      this.getExpirationTime(),
      this.store.select(selectIsLoginSelector)
    ).pipe(
      map(([expirationTime, isLogin]) => {
        if (expirationTime > Date.now() / 1000) return isLogin
        else return false
      }),
      catchError(() => of(true))
    )
  }

  public getExpirationTime(): Observable<number> {
    if (firebase) {
      const authFunction = firebase.auth()
      if (authFunction.currentUser) {
        return from(authFunction.currentUser.getIdTokenResult()).pipe(
          map((user) => {
            if (user) return Date.parse(user.expirationTime)
            return 0
          })
        )
      }
    }
    return of(0)
  }

  public getFirebaseUser(): Observable<firebase.User | null> {
    return this.firebaseAuth.user
  }
}
