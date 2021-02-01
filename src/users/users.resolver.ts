import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInPut,
  CreateAccountOutPut,
} from './dtos/createAccount.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { LoginInPut, LoginOutPut } from './dtos/login.dto';

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

  @Mutation(() => LoginOutPut)
  async login(@Args('input') loginInput: LoginInPut): Promise<LoginOutPut> {
    return this.userService.login(loginInput);
  }
}
