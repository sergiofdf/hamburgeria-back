import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Categorias
  @Post('category')
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.productsService.createCategory(categoryDto);
  }

  @Get('category')
  async findAllCategories() {
    return await this.productsService.findAllCategories();
  }

  @Get('category/:id')
  async findOneCategory(@Param('id') id: string) {
    return await this.productsService.findOneCategory(+id);
  }

  @Patch('category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ) {
    return this.productsService.updateCategory(+id, categoryDto);
  }

  @Delete('category/:id')
  @HttpCode(204)
  async removeCategory(@Param('id') id: string) {
    return this.productsService.removeCategory(+id);
  }

  //Produtos
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
