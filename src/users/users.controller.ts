import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/signin/guards/jwt.guard';
import { GetUserDTO, UsersDTO } from './users.dto';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UsersDTO })
  @ApiOkResponse({ type: GetUserDTO })
  @ApiBadRequestResponse({ description: 'E-mail já existente' })
  async create(@Body() user: UsersDTO): Promise<any> {
    return await this.usersService.newUser(user);
  }

  @UseGuards(JwtGuard)
  @ApiParam({ name: ':userid', type: String })
  @ApiOkResponse({ type: GetUserDTO })
  @ApiBadRequestResponse({ description: 'Usuário inexistente' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @Get(':userid')
  async getUserByUserId(@Param('userid') any: any, @Request() data: any) {
    return await this.usersService.getUserByUserId(data.params.userid);
  }
}
