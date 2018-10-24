import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // Propoerty-based inyection
    @Inject('UsersRepository') private readonly usersRepository: typeof User) {}
    // private readonly userService: User) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
}
