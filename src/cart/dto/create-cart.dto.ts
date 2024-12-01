import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateCartDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;
  @IsNotEmpty()
  @IsInt()
  quantity: number;
  user_id: string;
  user: any;
}
