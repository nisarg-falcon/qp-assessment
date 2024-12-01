import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { RoleGuard, Roles } from 'src/auth/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteProductDto } from './dto/delete-product.dto';
import { UpdateInventoryDto, UpdateProductDto } from './dto/update-product.dto';
import { IRequest } from 'src/global/interceptor';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  createProduct(@Body() body: CreateProductDto, @Req() req: IRequest) {
    return this.productService.createProduct({
      ...body,
      created_by: req.user.id,
    });
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  deleteProduct(@Param() id: DeleteProductDto) {
    return this.productService.deleteProduct(id);
  }

  @Patch()
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  updateProduct(@Body() body: UpdateProductDto) {
    return this.productService.updateProduct(body);
  }

  @Put('manage-inventory')
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  updateInventory(@Body() body: UpdateInventoryDto) {
    return this.productService.updateInventory(body);
  }
}
