export interface User {
  id?: string
  displayName: string
  email: string
  emailVerified: boolean
  access_token: string
}

export function emptyUser(): User {
  return <User>{
    email: '',
    displayName: '',
    id: '',
    emailVerified: false,
    access_token: '',
  }
}
