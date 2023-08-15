import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IsPublic } from '../../shared/decorators/is-public.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestErrorSwagger } from '../../shared/swagger/request-error.swagger';
import { UnauthorizedSwagger } from '../../shared/swagger/unauthorized.swagger';
import { FindByEmailDto } from './dto/find-by-email.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retorna info do usuário logado' })
  @ApiResponse({ status: 200, description: 'Usuário logado', type: User })
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Cadastra um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso', type: User })
  @ApiResponse({ status: 400, description: 'Dado inválido', type: RequestErrorSwagger })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Post()
  @IsPublic()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Lista usuários cadastrados no sistema.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários encontrada com sucesso.',
    type: User,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @Get()
  @IsPublic()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Busca usuário pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.', type: User })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca usuário pelo email informado.' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.', type: User })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Post('find-by-email')
  async findOneByEmail(@Body() body: FindByEmailDto): Promise<User> {
    const { email } = body;
    return await this.usersService.findOneByEmail(email);
  }

  @ApiOperation({ summary: 'Atualiza usuário pelo Id informado.' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: User })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove usuário pelo Id informado.' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Desativa usuário pelo Id informado.' })
  @ApiResponse({ status: 204, description: 'Usuário desativado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não Autorizado', type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, description: 'Não Encontrado', type: RequestErrorSwagger })
  @Patch('deactivate/:id')
  @HttpCode(204)
  async Deactivate(@Param('id') id: string): Promise<void> {
    return await this.usersService.deactivate(id);
  }
}
