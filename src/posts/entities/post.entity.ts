import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType() //자동으로 schema를 build 하기위해 사용하는 graphql decorator
@Entity() //Entity for typeORM
export class Post extends CommonEntity {
  @Field(() => String)
  @Column()
  @IsString()
  content: string;

  @Field(() => Number)
  @Column({ default: 0 })
  @IsNumber()
  likeCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  writer: User;

  @RelationId((post: Post) => post.writer)
  writerId: number;
}
