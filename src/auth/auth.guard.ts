import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthService } from './jwtAuth.service';

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtAuthService: JwtAuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    try {
      const user = await this.jwtAuthService.verify(token);
      request.user = user;
      return true;
    } catch {
      new UnauthorizedException();
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
