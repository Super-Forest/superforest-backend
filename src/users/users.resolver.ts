import { Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    return [];
  }
}
