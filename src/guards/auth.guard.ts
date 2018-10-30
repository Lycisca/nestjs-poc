import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request) {
    const key = 'authorization';
    return request.headers[key] == process.env.API_TOKEN;
  }
}
