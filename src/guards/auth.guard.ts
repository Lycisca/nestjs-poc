import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request) {
    return request.headers['authorization'] == process.env.API_TOKEN;
  }
}
