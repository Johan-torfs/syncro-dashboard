import {UserLogin} from './userLogin';

export interface UserResponse {
  access_token: string;
  user: UserLogin;
}