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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { AddProductDto } from './dto/add-product.dto';
import { OrderProduct } from './entities/order-product.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //Produtos do pedido
  @Post('addProducts')
  async addProductToOrder(@Body() addProductsToOrderDto: AddProductDto[]) {
    return await this.ordersService.addProductsToOrder(addProductsToOrderDto);
  }

  @Patch('updateProducts')
  async updateProductFromOrder(
    @Body() updateProductsFromOrder: Partial<OrderProduct>[],
  ) {
    return await this.ordersService.updateProductsFromOrder(
      updateProductsFromOrder,
    );
  }

  @Delete('removeProducts')
  @HttpCode(204)
  async removeProductsFromOrder(
    @Body() removeProductsFromOrder: Partial<OrderProduct>[],
  ) {
    return await this.ordersService.removeProductsFromOrder(
      removeProductsFromOrder,
    );
  }

  //Pedidos
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<Order>,
  ) {
    console.log(updateOrderDto);
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
