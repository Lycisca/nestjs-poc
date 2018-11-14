import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Request,
  Res,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationUser } from '../pipes/validation.pipe';
import { AuthGuard } from '../guards/auth.guard';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiImplicitHeader } from '@nestjs/swagger';
import { JwtAuthService } from '../auth/jwtAuth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @ApiImplicitHeader({
    name: 'authorization',
    description: 'Authorization token',
    required: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  async index(): Promise<User[]> {
    return this.usersService.index();
  }

  @Post('login')
  async login(@Body() loginBody, @Res() res) {
    try {
      const token = await this.jwtAuthService.login(
        loginBody.email,
        loginBody.password,
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() request) {
    return request.user;
  }

  @Get(':id')
  @UsePipes(new ValidationUser())
  async show(@Param('id') userId: number) {
    return this.usersService.show(userId);
  }

  @Post()
  @UsePipes(new ValidationUser())
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationUser())
  async update(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationUser())
  async destroy(@Param('id') userId: number) {
    return this.usersService.destroy(userId);
  }
}
