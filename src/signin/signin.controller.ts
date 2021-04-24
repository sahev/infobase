import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { SigninService } from './signin.service';

@Controller()
export class SigninController {
  constructor(private signinService: SigninService) {}
  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Body() data) {
    console.log('data', data);
    const r = await this.signinService.login(data);

    return r;
  }
}
