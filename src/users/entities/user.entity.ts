import { InternalServerErrorException } from '@nestjs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Post } from 'src/posts/entities/post.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

@InputType({ isAbstract: true })
@ObjectType() //자동으로 schema를 build 하기위해 사용하는 graphql decorator
@Entity() //Entity for typeORM
export class User extends CommonEntity {
  @Field(() => String)
  @Column()
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column({ select: false })
  @IsString()
  password: string;

  @Field(() => Boolean)
  @Column({ default: false })
  @IsBoolean()
  emailVerified: boolean;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.writer)
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
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
