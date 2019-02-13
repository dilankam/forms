//user password should not store in the user object for long time
//so create this interface

export interface AuthData {
  email: string;
  password: string;
}
