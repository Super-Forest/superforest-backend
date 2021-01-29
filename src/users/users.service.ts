import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInPut } from './dtos/createAccount.dto';
import { LoginInPut } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
  }: CreateAccountInPut): Promise<{ ok: boolean; error?: string }> {
    try {
      const isExist = await this.users.findOne({ email });
      if (isExist) {
        return {
          ok: false,
          error: 'User Already Exist',
        };
      }
      await this.users.save(this.users.create({ email, password }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create account',
      };
    }
  }

  async login({
    email,
    password,
  }: LoginInPut): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      if (!user.checkPassword(password)) {
        return {
          ok: false,
          error: 'wrong password',
        };
      }

      return {
        ok: true,
        token: '',
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not login',
      };
    }
  }
}
