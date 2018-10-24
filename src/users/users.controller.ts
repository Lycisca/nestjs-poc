import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';
// import { UsersService } from './users.service';
import UserModel from './user.entity';

export class CreateDto {
  @ApiModelProperty() firstName: string;
  @ApiModelProperty() lastName: string;
}

export class UpdateDto extends CreateDto {}

@Controller('users')
export class UsersController {
  usersRespository: any;

  @Get()
  index() {
    return UserModel.findAll();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    console.log
    return UserModel.findById(id);
  }

  @Post()
  create(@Body() body: CreateDto) {
    return UserModel.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateDto) {
    const user = await UserModel.findById(id)
    user.update(body) // async update
    return user
  }

  @Delete(':id')
  async destroy(@Param('id') id: number){
    const user = await UserModel.findById(id)
    user.destroy({ force: true })
    return user
  }
}
