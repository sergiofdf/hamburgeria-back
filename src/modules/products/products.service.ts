import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';

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
    return await this.prisma.category.findFirst({
      where: {
        categoryId: id,
      },
    });
  }

  async updateCategory(id: number, categoryDto: CategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        categoryId: id,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    const updatedCategory = await this.prisma.category.update({
      where: {
        categoryId: id,
      },
      data: categoryDto,
    });
    return updatedCategory;
  }

  async removeCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        categoryId: id,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    await this.prisma.category.delete({
      where: {
        categoryId: id,
      },
    });
  }

  //Produtos
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
