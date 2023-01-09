import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.usersService.remove(id);
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }
}
