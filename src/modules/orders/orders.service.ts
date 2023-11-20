import { AddProductDto } from './dto/add-product.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { RemoveOrderProductDto } from './dto/remove-order-product.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { decimalToNumber, numberToDecimal } from 'src/shared/utils/decimal-to-number';
import { OrderWithProductsDetails } from './entities/order.entity';

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
        orderProduct: {
          select: {
            quantity: true,
            orderProductId: true,
            product: {
              select: {
                productId: true,
                name: true,
                price: true,
                category: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        orderId: id,
      },
      include: {
        orderProduct: {
          select: {
            quantity: true,
            orderProductId: true,
            product: {
              select: {
                productId: true,
                name: true,
                price: true,
                category: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    const updatedOrder = await this.prisma.order.update({
      data: updateOrderDto,
      where: {
        orderId: id,
      },
    });
    return updatedOrder;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.order.delete({
      where: {
        orderId: id,
      },
    });
  }

  //Produtos do pedido
  async addProductsToOrder(addProductsDto: AddProductDto[]) {
    const response = await this.prisma.orderProduct.createMany({
      data: addProductsDto,
    });

    const orderId = addProductsDto[0].order_id;
    const order = await this.findOne(orderId);
    await this.updateOrderTotalValue(order);
    return response;
  }

  async updateProductsFromOrder(productsToUpdate: UpdateOrderProductDto[]) {
    productsToUpdate.forEach(async (product) => {
      const updatedOrderProduct = await this.prisma.orderProduct.update({
        data: product,
        where: {
          orderProductId: product.orderProductId,
        },
      });
      const order = await this.findOne(updatedOrderProduct.order_id);
      await this.updateOrderTotalValue(order);
    });
  }

  async removeProductsFromOrder(productsToRemove: RemoveOrderProductDto[]) {
    productsToRemove.forEach(async (product) => {
      const removedOrderProduct = await this.prisma.orderProduct.delete({
        where: {
          orderProductId: product.orderProductId,
        },
      });
      const order = await this.findOne(removedOrderProduct.order_id);
      await this.updateOrderTotalValue(order);
    });
  }

  async updateOrderTotalValue(order: OrderWithProductsDetails) {
    const subTotals = order.orderProduct.map((p) => {
      const quantity = p.quantity;
      const product_price = p.product.price;
      return quantity * decimalToNumber(product_price);
    });
    const total = subTotals.reduce((acc, curr) => acc + curr, 0);

    const orderUpdate = new UpdateOrderDto();
    orderUpdate.total = total;

    await this.update(order.orderId, orderUpdate);
  }
}
