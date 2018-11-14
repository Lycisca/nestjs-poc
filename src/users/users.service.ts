import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { EmailJob } from '../jobs/email.job';
import { JobProvider } from '../jobs/application.job';

@Injectable()
export class UsersService {
  constructor(
    @Inject('jobProvider') private readonly jobProvider: JobProvider,
    @Inject('UsersRepository') private readonly usersRepository: typeof User,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async index(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  async show(userId: number): Promise<User> {
    return await this.usersRepository.findById(userId);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await User.create(createUserDto);
    new EmailJob(this.jobProvider).performLater({ to: 'example@example.com' });
    return await user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await User.findById(userId);
    return await user.update(updateUserDto);
  }

  async destroy(userId: number): Promise<User> {
    const user = await User.findById(userId);
    user.destroy({ force: true });
    return user;
  }
}
