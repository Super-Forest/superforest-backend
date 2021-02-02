import { Controller, Get, Post, UsePipes, Body, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/valication.pipe';
import { UserService } from './user.service';
import { CreateAccountInput } from './dtos/createAccount.dto';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  // @Get('users/:username')
  // showOneUser(@Param('username') username: string) {
  //   return this.userService.read(username);
  // }

  // @Post('auth/login')
  // @UsePipes(new ValidationPipe())
  // login(@Body() data: CreateAccountInput) {
  //   return this.userService.login(data);
  // }

  @Post('user')
  @UsePipes(new ValidationPipe())
  register(@Body() data: CreateAccountInput) {
    return this.userService.register(data);
  }
}
