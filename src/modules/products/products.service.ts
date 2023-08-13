import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  //Categorias
  async createCategory(categoryDto: CategoryDto) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: categoryDto.name,
      },
    });

    if (categoryExists) {
      throw new BadRequestException('Categoria já cadastrada.');
    }

    return await this.prisma.category.create({
      data: categoryDto,
    });
  }

  async findAllCategories() {
    return await this.prisma.category.findMany();
  }

  async findOneCategory(id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        categoryId: id,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async updateCategory(id: number, categoryDto: CategoryDto) {
    await this.findOneCategory(id);

    const updatedCategory = await this.prisma.category.update({
      where: {
        categoryId: id,
      },
      data: categoryDto,
    });
    return updatedCategory;
  }

  async removeCategory(id: number) {
    await this.findOneCategory(id);

    await this.prisma.category.delete({
      where: {
        categoryId: id,
      },
    });
  }

  //Produtos
  async create(createProductDto: CreateProductDto) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        name: createProductDto.name,
      },
    });

    if (productExists) {
      throw new BadRequestException('Produto já cadastrado.');
    }

    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({});
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        productId: id,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return product;
  }

  async update(id: string, updateProductDto: Partial<Product>) {
    await this.findOne(id);

    const updatedProduct = await this.prisma.product.update({
      where: {
        productId: id,
      },
      data: updateProductDto,
    });
    return updatedProduct;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.product.delete({
      where: {
        productId: id,
      },
    });
  }

  async updateImageUrl(productId: string, fileUrl: string) {
    await this.prisma.product.update({
      where: {
        productId,
      },
      data: {
        imageUrl: fileUrl,
      },
    });
  }

  async getImageUrl(productId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        productId,
      },
    });

    if (!product.imageUrl) {
      throw new NotFoundException('Imagem não cadastrada!');
    }

    return product.imageUrl;
  }
}
