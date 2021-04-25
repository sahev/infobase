import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtSecretKey } from './secret/secret';
import { JwtStrategy } from './strategy/jwt.strategy';

@Global()
@Module({
  providers: [SigninService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecretKey.secret,
    }),
  ],
  controllers: [SigninController],
  exports: [JwtModule, SigninService],
})
export class SigninModule {}
