import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Author } from '../authors/authors.schema';
import { Rental } from '../rentals/rentals.schema';

export type BookDocument = Book & mongoose.Document;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: number;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  genre: string;

  @Prop()
  @Field()
  publishedYear: string;

  @Prop()
  @Field(() => [Author])
  authorIds: Author[];

  @Prop()
  @Field(() => [Rental])
  rentalIds: Rental[];

  @Prop()
  @Field()
  createdAt: Date;

  @Prop()
  @Field()
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);

@InputType()
export class FindBookInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  publishedYear?: string;
}

@InputType()
export class CreateBookInput {
  @Field()
  name: string;

  @Field()
  genre: string;

  @Field()
  publishedYear: string;

  @Field(() => [String], { nullable: true })
  authorIds?: string[];
}

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  publishedYear?: string;

  @Field(() => [ID], { nullable: true })
  authorIds?: string[];

  @Field(() => [ID], { nullable: true })
  rentalIds?: string[];
}
