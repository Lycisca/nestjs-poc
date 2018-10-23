import { Component, Inject } from '@nestjs/common';
import UserModel from './user.entity';

@Component()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private readonly usersRepository: typeof User) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
}
