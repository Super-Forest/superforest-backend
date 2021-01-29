import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInPut,
  CreateAccountOutPut,
} from './dtos/createAccount.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query(() => [User])
  users(): User[] {
    return [];
  }

  @Mutation(() => CreateAccountOutPut)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInPut,
  ): Promise<CreateAccountOutPut> {
    return this.userService.createAccount(createAccountInput);
  }
}
