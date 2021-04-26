import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { compareSync } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokensent = request.headers.authorization.replace('Bearer ', '');
    const user = await this.usersService.getUserByUserId(request.params.userid);
    const isValid = await this.usersService.validAccess(request.params.userid);

    if (user && compareSync(tokensent, user.token)) {
      if (isValid) return true;

      throw new UnauthorizedException('Sessão inválida');
    }
    throw new UnauthorizedException('Não autorizado');
  }
}
