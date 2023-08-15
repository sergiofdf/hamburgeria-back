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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestErrorSwagger } from '../../shared/swagger/request-error.swagger';
import { UnauthorizedSwagger } from '../../shared/swagger/unauthorized.swagger';
import { Category } from './entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Categorias
  @ApiOperation({ summary: 'Cadastra uma nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria adicionada com sucesso', type: Category })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Post('category')
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.productsService.createCategory(categoryDto);
  }

  @ApiOperation({ summary: 'Lista categorias cadastradas no sistema.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias encontrada com sucesso.',
    type: Category,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Get('category')
  async findAllCategories() {
    return await this.productsService.findAllCategories();
  }

  @ApiOperation({ summary: 'Busca categoria pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada com sucesso.', type: Category })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Get('category/:id')
  async findOneCategory(@Param('id') id: number) {
    return await this.productsService.findOneCategory(+id);
  }

  @ApiOperation({ summary: 'Atualiza categoria pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso.', type: Category })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Patch('category/:id')
  async updateCategory(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
    return this.productsService.updateCategory(+id, categoryDto);
  }

  @ApiOperation({ summary: 'Remove categoria pelo Id informado.' })
  @ApiResponse({ status: 204, description: 'Categoria removida com sucesso.', type: null })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Delete('category/:id')
  @HttpCode(204)
  async removeCategory(@Param('id') id: number) {
    return this.productsService.removeCategory(+id);
  }

  //Produtos
  @ApiOperation({ summary: 'Cadastra um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto adicionado com sucesso', type: Product })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Lista produtos cadastrados no sistema.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos encontrada com sucesso.',
    type: Product,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Busca produto pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.', type: Product })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza produto pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.', type: Product })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove produto pelo Id informado.' })
  @ApiResponse({ status: 204, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Salva imagem de um produto no sistema.' })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Post('uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    await this.productsService.updateImageUrl(id, file.filename);
    return { imagePath: file.filename };
  }

  @ApiOperation({ summary: 'Busca a imagem de um produto no sistema.' })
  @ApiResponse({ status: 200, description: 'Imagem encontrada' })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Get('getImage/:id')
  async findProductImage(@Param('id') id: string, @Res() res) {
    const imageUrl = await this.productsService.getImageUrl(id);
    return res.sendFile(process.cwd() + '/uploads/productsImages/' + imageUrl);
  }
}
