import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

export class CreateDto {
  @ApiModelProperty() firstName: string;
  @ApiModelProperty() lastName: string;
}

export class UpdateDto extends CreateDto {}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  index() {
    return User.findAll();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return User.findById(id);
  }

  @Post()
  create(@Body() body: CreateDto) {
    return User.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateDto) {
    const user = await User.findById(id)
    user.update(body) // async update
    return user
  }

  @Delete(':id')
  async destroy(@Param('id') id: number){
    const user = await User.findById(id)
    user.destroy({ force: true })
    return user
  }
}
