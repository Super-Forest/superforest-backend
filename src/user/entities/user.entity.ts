import { InternalServerErrorException } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from '../dtos/createAccount.dto';

@InputType({ isAbstract: true })
@ObjectType() //자동으로 schema를 build 하기위해 사용하는 graphql decorator
@Entity() //Entity for typeORM
export class User extends CommonEntity {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @IsString()
  @Column()
  password: string;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @Column()
  emailVerified: boolean;

  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, this.password);
      return result;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  toResponseObject(showToken = true): UserRO {
    const { id, email, createdAt, token, password } = this;
    const responseObject: UserRO = {
      id,
      email,
      createdAt,
      password,
    };

    if (this.email) {
      responseObject.email = this.email;
    }

    if (this.password) {
      responseObject.password = this.password;
    }

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, email } = this;

    return jwt.sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
