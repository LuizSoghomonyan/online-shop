import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { emptyUser, User } from "./models/user";
import firebase from "firebase/compat";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router
    ) {
    this.userData = emptyUser();

  }

  public logIn(email: string, password: string): Observable<User | undefined>{
    return from(this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user)
            return this.userDtoConvertToUser(result.user);
        return undefined
      }));
  }


   private userDtoConvertToUser(user: firebase.User): User {
      this.userData.id = user.uid;
      this.userData.email = user.email || '';
      this.userData.displayName = user.displayName || '';
      this.userData.emailVerified = user.emailVerified
     return this.userData

  }


}
