import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class JwtAuthService {
  jwtService: JwtService;
  constructor(private readonly usersService: UsersService) {
    this.jwtService = new JwtService({
      secretOrPrivateKey: process.env.JWT_TOKEN || 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    });
  }

  async sign(email, password): Promise<string> {
    return this.jwtService.sign({ email, password });
  }

  async verify(token): Promise<User> {
    try {
      this.jwtService.verify(token);
      const payload: any = this.jwtService.decode(token, { json: true });
      const user = await this.usersService.findOneByEmail(payload.email);

      if (!user) throw new Error('User not found');
      return user;
    } catch {
      throw new Error('authorization fail');
    }
  }
}
