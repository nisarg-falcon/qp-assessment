import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { IRequest } from 'src/global/interceptor';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
@Roles('user')
@UseGuards(AuthGuard, RoleGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() body: CreateCartDto, @Req() req: IRequest) {
    return this.cartService.add({
      ...body,
      user: req.user,
      user_id: req.user.id,
    });
  }

  @Get()
  findAll(@Req() req: IRequest) {
    return this.cartService.findAll(req);
  }

  @Patch('update-inventory')
  update(@Body() body: UpdateCartDto) {
    return this.cartService.update(body);
  }
}
