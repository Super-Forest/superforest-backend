import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonEntity {
  @Field(() => Number)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
