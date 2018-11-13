import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService({
  secretOrPrivateKey: process.env.JWT_TOKEN || '12345',
});

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    try {
      console.log('TOKEN', token);
      jwt.verify(token);
      const payload = jwt.decode(token, { json: true });
      console.log('PAYLOAD', payload);
      return true;
    } catch {
      console.log('ERROR AUTH');
      return false;
    }
    // this.authService.validateUser({ email: 'user@email.com' });
    // return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
