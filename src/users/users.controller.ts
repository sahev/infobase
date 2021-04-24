import { Body, Controller, Post } from '@nestjs/common';
import { Users } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  async create(@Body() user: Users): Promise<Users> {
    return await this.usersService.newUser(user);
  }
}
