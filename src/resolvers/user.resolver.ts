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
import { JwtAuthService } from '../auth/jwtAuth.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Query('user')
  async user(@Args('id') id: number) {
    return this.usersService.show(id);
  }

  @Query('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // graphql rescue all errors
    return this.jwtAuthService.login(email, password);
  }

  @Query('users')
  async users() {
    return this.usersService.index();
  }

  @Mutation('userCreate')
  async userCreate(@Args() { input }, @Context() context) {
    if (context.scope !== 'ADMIN') throw new AuthenticationError('not admin');
    if (input.firstName == 'error') {
      throw new UserInputError('Form Arguments invalid', {
        customError: { email: 'Email is already taken' },
      });
    }
    return await this.usersService.create(input);
  }

  @Mutation('userUpdate')
  async userUpdate(@Args() { input, id }) {
    return await this.usersService.update(id, input);
  }

  @Mutation('userDelete')
  async userDelete(@Args() { id }) {
    return await this.usersService.destroy(id);
  }

  // @ResolveProperty('posts')
  // async getPosts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}
