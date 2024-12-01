import { Product } from 'src/product/product.interface';
import { User } from 'src/user/user.interface';

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  user?: User;
  product?: Product;
}

export class FetchCartRes {
  cart_data: Cart[];
}
