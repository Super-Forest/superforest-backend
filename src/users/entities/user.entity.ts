import { InternalServerErrorException } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@ObjectType()
export class User extends CommonEntity {
  @Field(() => String)
  @IsEmail()
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
}
