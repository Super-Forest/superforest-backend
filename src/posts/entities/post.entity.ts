import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType() //자동으로 schema를 build 하기위해 사용하는 graphql decorator
@Entity() //Entity for typeORM
export class Post extends CommonEntity {
  @Field(() => Number)
  @Column()
  @IsNumber()
  userId: number;

  @Field(() => String)
  @Column()
  @IsString()
  content: string;

  @Field(() => Number)
  @Column({ default: 0 })
  @IsNumber()
  likeCount: number;
}
