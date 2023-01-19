import firebase from 'firebase/compat'

export interface AuthStateInterface {
  isLogin: boolean
  isRegistered: boolean
  currentUser?: firebase.User | null
}
