export interface User {
  id?: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
}

export function emptyUser(): User {
  return <User>{
    email: '',
    displayName: '',
    id: '',
    emailVerified: false,
  };
}
