import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from '../books/books.schema';
import { User } from '../users/users.schema';

export type RentalDocument = Rental & mongoose.Document;

@Schema()
@ObjectType()
export class Rental {
  @Field(() => ID)
  _id: number;

  @Prop()
  @Field()
  dateRented: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  userId: User;

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

export const RentalSchema = SchemaFactory.createForClass(Rental);

@InputType()
export class FindRentalInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  dateRented: Date;
}

@InputType()
export class CreateRentalInput {
  @Field({ nullable: true })
  dateRented?: Date;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => [ID], { nullable: true })
  bookIds?: string[];
}
