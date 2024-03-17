import { Module } from '@nestjs/common';
import { RentalsResolver } from './rentals.resolver';
import { RentalsService } from './rentals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rental, RentalSchema } from './rental.schema';
import { User, UserSchema } from '../users/users.schema';
import { Book, BookSchema } from '../books/book.schema';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rental.name, schema: RentalSchema },
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [RentalsResolver, RentalsService, UsersService, BooksService],
})
export class RentalsModule {}
