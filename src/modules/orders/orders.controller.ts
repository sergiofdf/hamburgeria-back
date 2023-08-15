import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddProductDto } from './dto/add-product.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestErrorSwagger } from '../../shared/swagger/request-error.swagger';
import { UnauthorizedSwagger } from '../../shared/swagger/unauthorized.swagger';
import { ResponseCountMany } from '../../shared/swagger/response-count-many.swagger';
import { OrderResponseSwagger, OrderResponseSwaggerWithoutOrderProducts } from './swagger/order-response.swagger';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { RemoveOrderProductDto } from './dto/remove-order-product.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //Produtos do pedido
  @ApiOperation({ summary: 'Adiciona produtos a um pedido' })
  @ApiResponse({ status: 201, description: 'Produtos adicionados com sucesso', type: ResponseCountMany })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiBody({ type: [AddProductDto] })
  @Post('addProducts')
  async addProductToOrder(@Body() addProductsToOrderDto: AddProductDto[]) {
    return await this.ordersService.addProductsToOrder(addProductsToOrderDto);
  }

  @ApiOperation({ summary: 'Atualiza dados de uma lista de produtos de um pedido' })
  @ApiResponse({ status: 200, description: 'Produtos atualizados com sucesso', type: ResponseCountMany })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiBody({ type: [UpdateOrderProductDto] })
  @Patch('updateProducts')
  async updateProductFromOrder(@Body() updateProductsFromOrder: UpdateOrderProductDto[]) {
    return await this.ordersService.updateProductsFromOrder(updateProductsFromOrder);
  }

  @ApiOperation({ summary: 'Remove uma lista de produtos de um pedido' })
  @ApiResponse({ status: 200, description: 'Produtos removidos com sucesso', type: ResponseCountMany })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiBody({ type: [RemoveOrderProductDto] })
  @Delete('removeProducts')
  @HttpCode(204)
  async removeProductsFromOrder(@Body() removeProductsFromOrder: RemoveOrderProductDto[]) {
    return await this.ordersService.removeProductsFromOrder(removeProductsFromOrder);
  }

  //Pedidos
  @ApiOperation({ summary: 'Cadastro de novo pedido no sistema.' })
  @ApiResponse({ status: 201, description: 'Pedido cadastrado com sucesso', type: OrderResponseSwagger })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Lista pedidos cadastrados no sistema.' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos encontrada com sucesso.', type: OrderResponseSwagger, isArray: true })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Busca pedido pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado com sucesso.', type: OrderResponseSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza pedido pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso.', type: OrderResponseSwaggerWithoutOrderProducts })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return await this.ordersService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Remove pedido pelo Id informado.' })
  @ApiResponse({ status: 204, description: 'Pedido removido com sucesso.', type: null })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
