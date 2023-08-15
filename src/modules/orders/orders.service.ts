import { AddProductDto } from './dto/add-product.dto';
import { PrismaService } from './../../prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { RemoveOrderProductDto } from './dto/remove-order-product.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        orderProduct: true,
      },
    });

    return orders;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        orderId: id,
      },
      include: {
        orderProduct: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    const updatedOrder = await this.prisma.order.update({
      data: updateOrderDto,
      where: {
        orderId: id,
      },
    });
    return updatedOrder;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.order.delete({
      where: {
        orderId: id,
      },
    });
  }

  //Produtos do pedido
  async addProductsToOrder(addProductsDto: AddProductDto[]) {
    return await this.prisma.orderProduct.createMany({
      data: addProductsDto,
    });
  }

  async updateProductsFromOrder(productsToUpdate: UpdateOrderProductDto[]) {
    productsToUpdate.forEach(async (product) => {
      await this.prisma.orderProduct.update({
        data: product,
        where: {
          orderProductId: product.orderProductId,
        },
      });
    });
  }

  async removeProductsFromOrder(productsToRemove: RemoveOrderProductDto[]) {
    productsToRemove.forEach(async (product) => {
      await this.prisma.orderProduct.delete({
        where: {
          orderProductId: product.orderProductId,
        },
      });
    });
  }
}
