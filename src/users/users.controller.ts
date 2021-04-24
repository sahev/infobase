import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/signin/guards/jwt.guard';
import { Users } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  async create(@Body() user: Users): Promise<Users> {
    return await this.usersService.newUser(user);
  }

  @UseGuards(JwtGuard)
  @Get('user/:_id')
  async getUserByUserId(@Request() data: any) {
    // console.log('get id', data.headers.authorization);
    const tokensent = data.headers.authorization.replace('Bearer ', '');
    const user = await this.usersService.getUserByUserId(data.user._id);

    console.log(user.token, tokensent, user._id, data.params._id);
    if (user && user.token === tokensent && user._id === data.params._id)
      return user;

    throw new UnauthorizedException('Não autorizado');
  }
}
