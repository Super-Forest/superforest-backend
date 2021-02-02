import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { UserService } from './user.service';
import { CreateAccountInput } from './dtos/createAccount.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query()
  async users(@Args('page') page: number) {
    return await this.userService.showAll(page);
  }

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: CreateAccountInput = { email, password };
    return await this.userService.register(user);
  }
}
