import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../books/books.schema';

/**
  This create a type AuthorsDocument, which is a combination of Author class and 
  mongoose Document. This type is used to represent MongoDB documents for Authors schema.
*/
export type AuthorDocument = Author & mongoose.Document;

/** Schema() decorator indicates that Author class should be treat as mongoose schema */
/** ObjectType() decorator marks the class as a GraphQL type */
@Schema()
@ObjectType()
export class Author {
  /**
    Defines the _id field in the GraphQL schema as an ID type. 
    In GraphQL, ID is a special scalar type used to represent unique identifiers.
  */
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

/**
Creates a Mongoose schema based on the Author class using SchemaFactory.createForClass(). 
This schema is then used to interact with MongoDB.
*/
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
