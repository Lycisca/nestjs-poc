import {
  Resolver,
  Query,
  ResolveProperty,
  Args,
  Parent,
} from '@nestjs/graphql';

import { UsersService } from '../users/users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async user(@Args('id') id: number) {
    return this.usersService.show(id);
  }

  // @ResolveProperty('posts')
  // async getPosts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}
