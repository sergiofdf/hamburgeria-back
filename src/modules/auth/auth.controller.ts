import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';
import { IsPublic } from '../../shared/decorators/is-public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginBodySwagger } from './swagger/login-body.swagger';
import { LoginReturnSwagger } from './swagger/login-return.swagger';
import { RequestErrorSwagger } from '../../shared/swagger/request-error.swagger';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cria token de acesso para usuário informado' })
  @ApiBody({ required: true, type: LoginBodySwagger })
  @ApiResponse({
    status: 200,
    description: 'Token do usuário logado',
    type: LoginReturnSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: RequestErrorSwagger,
  })
  @ApiResponse({ status: 500, description: 'Não foi possível gerar o token' })
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
