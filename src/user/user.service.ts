import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User as UserEntity } from './entities/user.entity';
import { CreateAccountInput } from './dtos/createAccount.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async showAll(page = 1) {
    const users = await this.userRepository.find({
      take: 25,
      skip: 25 * (page - 1),
    });
    return users.map((user) => user.toResponseObject(false));
  }

  // async read(username: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { username },
  //     relations: ['boards', 'stars'],
  //   });
  //   return user.toResponseObject(false);
  // }

  // async login(data: CreateAccountInput) {
  //   const { username, password } = data;
  //   const user = await this.userRepository.findOne({ where: { username } });
  //   if (!user || !(await user.comparePassword(password))) {
  //     throw new HttpException(
  //       'Invalid username/password',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return user.toResponseObject();
  // }

  async register(data: CreateAccountInput) {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
