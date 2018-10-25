import { Controller, Get, Post, Delete, Put, Param, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationUser } from '../pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.index();
  }

  @Get(':id')
  @UsePipes(new ValidationUser())
  async show(@Param('id') userId: number) {
    return this.usersService.show(userId);
  }

  @Post()
  @UsePipes(new ValidationUser())
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationUser())
  async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationUser())
  async destroy(@Param('id') userId: number){
    await this.usersService.destroy(userId);
  }
}
