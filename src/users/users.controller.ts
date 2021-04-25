import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/signin/guards/jwt.guard';
import { Users } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  async create(@Body() user: Users): Promise<any> {
    return await this.usersService.newUser(user);
  }

  @UseGuards(JwtGuard)
  @Get('user/:_id')
  async getUserByUserId(@Request() data: any) {
    return await this.usersService.getUserByUserId(data.params._id);
  }
}
