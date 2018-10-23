import { Controller, Get } from '@nestjs/common';
// import { UsersService } from './users.service';
import UserModel from './user.entity';

@Controller('users')
export class UsersController {
  usersRespository: any;
  @Get()
  findAll() {
    return UserModel.findAll();
  }
}
