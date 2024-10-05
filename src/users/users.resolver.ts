import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  CreateUserInput,
  FindUserInput,
  UpdateUserInput,
  User,
} from './users.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getAllUsers(
    @Args('params') params: FindUserInput,
  ): Promise<User[] | void> {
    return await this.userService.getAllUsers(params);
  }

  @Query(() => User, { name: 'user' })
  async findUserById(
    @Args('params') { _id }: FindUserInput,
  ): Promise<User | void> {
    return await this.userService.findUserById(_id);
  }

  @Mutation(() => User)
  async createUser(@Args('params') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('params') user: UpdateUserInput,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
