import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { CreateUserInput, FindUserInput, UpdateUserInput, User } from './users.schema';
import { UsersService } from './users.service';
import { RentalsService } from '../rentals/rentals.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService, private rentalService: RentalsService) {}

  @Query(() => [User], { name: 'users' })
  async getAllUsers(@Args('params') params: FindUserInput): Promise<User[] | void> {
    return await this.userService.getAllUsers(params);
  }

  @Query(() => User, { name: 'user' })
  async findUserById(@Args('params') { _id }: FindUserInput): Promise<User | void> {
    return await this.userService.findUserById(_id);
  }

  @Mutation(() => User)
  async createUser(@Args('params') user: CreateUserInput) {
    return this.userService.createUser(user);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('params') user: UpdateUserInput) {
    return this.userService.updateUser(id, user);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @ResolveField(() => User)
  async rentalIds(@Parent() parent: User) {
    return await this.rentalService.findByUserId(parent._id);
  }
}
