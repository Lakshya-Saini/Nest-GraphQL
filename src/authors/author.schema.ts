import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../books/book.schema';

export type AuthorDocument = Author & mongoose.Document;

@Schema()
@ObjectType()
export class Author {
  @Field(() => ID)
  _id: number;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field(() => [Book])
  bookIds: Book[];

  @Prop()
  @Field()
  createdAt: Date;

  @Prop()
  @Field()
  updatedAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

@InputType()
export class FindAuthorInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  country?: string;
}

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  country: string;

  @Field(() => [ID], { nullable: true })
  bookIds?: string[];
}

@InputType()
export class UpdateAuthorInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: true })
  bookIds?: string[];
}
