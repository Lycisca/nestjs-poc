import {
  Resolver,
  Query,
  Mutation,
  ResolveProperty,
  Args,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { UsersService } from '../users/users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async user(@Args('id') id: number) {
    return this.usersService.show(id);
  }

  @Mutation('createUser')
  async createUser(@Args() { input }, @Context() context) {
    if (context.scope !== 'ADMIN') throw new AuthenticationError('not admin');
    if (input.firstName == 'error') {
      throw new UserInputError('Form Arguments invalid', {
        customError: { email: 'Email is already taken' },
      });
    }
    return await this.usersService.create(input);
  }

  @Mutation('updateUser')
  async updateUser(@Args() { input, id }) {
    console.log(id);
    return await this.usersService.update(id, input);
  }

  // @ResolveProperty('posts')
  // async getPosts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}
