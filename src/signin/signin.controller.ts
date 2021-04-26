import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUserDTO } from 'src/users/users.dto';
import { LocalGuard } from './guards/local.guard';
import { SigninDTO } from './signin.dto';
import { SigninService } from './signin.service';

@Controller()
export class SigninController {
  constructor(private signinService: SigninService) {}

  @UseGuards(LocalGuard)
  @ApiBody({ type: SigninDTO })
  @ApiOkResponse({ type: GetUserDTO })
  @ApiBadRequestResponse({ description: 'Usuário inexistente' })
  @ApiUnauthorizedResponse({ description: 'Usuário e/ou senha inválidos' })
  @Post('signin')
  async login(@Body() data) {
    return await this.signinService.login(data);
  }
}
