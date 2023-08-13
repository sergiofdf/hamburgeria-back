import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryDto } from './dto/category.dto';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

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
    @Body() updateProductDto: Partial<Product>,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('uploadImage/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/productsImages/',
        filename: (req, file, cb) => {
          const removedChars = file.originalname.replace(/\s/g, '');
          const preName = Date.now().toString();
          const filename: string = preName + '_' + removedChars;

          cb(null, `${filename}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.productsService.updateImageUrl(id, file.filename);
    return { imagePath: file.filename };
  }

  @Get('getImage/:id')
  async findProductImage(@Param('id') id: string, @Res() res) {
    const imageUrl = await this.productsService.getImageUrl(id);
    return res.sendFile(process.cwd() + '/uploads/productsImages/' + imageUrl);
  }
}
