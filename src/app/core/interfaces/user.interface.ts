export type Roles = 'admin' | 'client';

export interface User{
  username: string,
  password: string
 }
 export interface UserResponse {
  expirationTime: number,
  id: string,
  name: string,
  rol: string,
  token: string
}

 export interface UserWithToken extends User {
  token: string;
  role: string;
}

