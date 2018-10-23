import { Injectable, Inject } from '@nestjs/common';
import { UserModel } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // Propoerty-based inyection
    @Inject('UsersRepository') private readonly usersRepository: typeof UserModel) {}
    // private readonly userService: UserModel) {}

  async findAll(): Promise<UserModel[]> {
    return await this.usersRepository.findAll<UserModel>();
  }
}
