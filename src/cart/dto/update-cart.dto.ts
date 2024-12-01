import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
