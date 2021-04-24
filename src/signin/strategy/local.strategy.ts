import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninService } from '../signin.service';
import { SigninDTO } from '../signin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private signinService: SigninService) {
    super({ usernameField: 'email' });
  }

  async validate(email: SigninDTO, password: SigninDTO): Promise<any> {
    const data = { email, password };
    const user = await this.signinService.authUser(data);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }
    return user;
  }
}
