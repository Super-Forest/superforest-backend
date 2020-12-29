import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';

@Module({
  providers: [UserResolver],
})
export class UsersModule {}
