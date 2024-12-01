import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProducts, Product } from './product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteProductDto } from './dto/delete-product.dto';
import { UpdateInventoryDto, UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<Product>,
  ) {}
  async createProduct(body: CreateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.create(body);
      return await this.productRepository.save(product);
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
  async getProducts(): Promise<GetProducts> {
    try {
      const products = await this.productRepository.find();
      return { products };
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
  async deleteProduct(id: DeleteProductDto): Promise<void> {
    try {
      const productDetails = await this.productRepository.findOne({
        where: {
          id: id.id,
        },
      });
      if (!productDetails) {
        throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
      }
      await this.productRepository.delete(id.id);
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
  async updateProduct(body: UpdateProductDto): Promise<void> {
    try {
      const { id, name, description, price } = body;

      const productDetails = await this.productRepository.findOne({
        where: {
          id,
        },
      });
      if (!productDetails) {
        throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
      }
      if (!name) delete body.name;
      if (!description) delete body.description;
      if (!price) delete body.price;
      await this.productRepository.update({ id }, body);
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
  async updateInventory(body: UpdateInventoryDto): Promise<void> {
    try {
      const { id, quantity } = body;
      const productDetails = await this.productRepository.findOne({
        where: {
          id,
        },
      });
      if (!productDetails) {
        throw new HttpException('Product not found!', HttpStatus.BAD_REQUEST);
      }
      await this.productRepository.update({ id }, { quantity });
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
  async getProductDetails(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOne({ where: { id } });
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
