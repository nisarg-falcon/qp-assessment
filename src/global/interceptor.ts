import { User } from 'src/user/user.interface';

export interface IRequest extends Request {
  user?: User;
}
