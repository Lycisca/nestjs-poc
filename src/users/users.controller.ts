import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }
}
