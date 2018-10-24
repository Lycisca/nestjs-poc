import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UpdateDto extends CreateUserDto {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.index();
  }

  @Get(':id')
  async show(@Param('id') userId: number) {
    return this.usersService.show(userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  async destroy(@Param('id') userId: number){
    await this.usersService.destroy(userId);
  }
}
