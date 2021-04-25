import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class SigninService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async authUser(data: any) {
    const user = await this.usersService.getUserByEmail(data.email);

    if (user && compareSync(data.password, user.senha)) {
      this.usersService.setLastAccess(data.email);
      return user;
    }
    return null;
  }
  async login(data: any) {
    const user = await this.usersService.getUserByEmail(data.email);
    return { user };
  }
}
