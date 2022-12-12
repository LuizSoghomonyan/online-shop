type errorMessage = {
  [index: string]: string
}

export const messages: errorMessage = {
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-email': 'The email address is badly formatted.',
}
