import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Equal, Repository } from 'typeorm';
import { Cart, FetchCartRes } from './cart.interface';
import { ProductService } from 'src/product/product.service';
import { FetchCartDto } from './dto/fetch-cart.dto';
import { UserService } from 'src/user/user.service';
import { IRequest } from 'src/global/interceptor';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<Cart>,
    private productService: ProductService,
    private userService: UserService,
  ) {}
  async add(body: CreateCartDto) {
    try {
      const product = await this.productService.getProductDetails(
        body.product_id,
      );
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.getUserDetails(body.user.email);
      const isAlreadyExists = await this.cartRepository.findOne({
        where: {
          user: Equal(body.user_id),
          product: Equal(body.product_id),
        },
      });
      if (isAlreadyExists) {
        throw new HttpException('Item already exists!', HttpStatus.BAD_REQUEST);
      }
      return await this.cartRepository.insert({
        ...body,
        user,
        product,
      });
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Internal server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async findAll(req: IRequest): Promise<FetchCartRes> {
    try {
      const cartData = await this.cartRepository.find({
        where: {
          user: Equal(req.user.id),
        },
      });
      return { cart_data: cartData };
    } catch (error) {
      throw new HttpException(
        'Internal server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async findOne(data: FetchCartDto) {
    try {
      const fetchData = await this.cartRepository.findOne({
        where: data,
      });
      return fetchData;
    } catch (error) {
      throw new HttpException(
        'Internal server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async update(updateCartDto: UpdateCartDto): Promise<void> {
    try {
      const cart = await this.findOne({ id: updateCartDto.id });
      if (!cart) {
        throw new HttpException(
          'Item not found in cart',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.cartRepository.update(
        { id: updateCartDto.id },
        {
          quantity: updateCartDto.quantity,
        },
      );
    } catch (error) {
      throw new HttpException(
        'Internal server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
