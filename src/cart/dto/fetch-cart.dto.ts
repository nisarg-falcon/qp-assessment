import { IsUUID } from 'class-validator';

export class FetchCartDto {
  @IsUUID()
  user_id?: string;

  @IsUUID()
  product_id?: string;
  @IsUUID()
  id?: string;
}
