import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecretKey } from '../secret/secret';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey.secret,
    });
  }

  async validate(payload: any) {
    console.log('paylodad ', payload);
    const user = await this.usersService.getUserByUserId(payload._id);
    console.log('payload user', user._id, user.email);
    return { _id: payload._id, email: payload.email };
  }
}
