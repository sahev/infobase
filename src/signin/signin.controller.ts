import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { SigninService } from './signin.service';

@Controller()
export class SigninController {
  constructor(private signinService: SigninService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Body() data) {
    return await this.signinService.login(data);
  }
}
