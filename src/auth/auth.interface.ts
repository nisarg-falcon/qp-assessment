import { User } from 'src/user/user.interface';

export interface Auth extends User {
  access_token: string;
}
