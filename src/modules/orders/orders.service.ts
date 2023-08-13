import { AddProductDto } from './dto/add-product.dto';
import { PrismaService } from './../../prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { Order } from './entities/order.entity';

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
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async update(id: string, updateOrderDto: Partial<Order>) {
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

  async removeProductsFromOrder(productsToRemove: AddProductDto[]) {
    productsToRemove.forEach(async (product) => {
      await this.prisma.orderProduct.deleteMany({
        where: {
          product_id: product.product_id,
          order_id: product.order_id,
        },
      });
    });
  }
}
