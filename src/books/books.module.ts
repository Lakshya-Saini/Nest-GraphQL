import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { Author, AuthorSchema } from '../authors/author.schema';
import { AuthorsService } from '../authors/authors.service';
import { Rental, RentalSchema } from '../rentals/rental.schema';
import { RentalsService } from '../rentals/rentals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Rental.name, schema: RentalSchema },
    ]),
  ],
  providers: [BooksService, BooksResolver, AuthorsService, RentalsService],
})
export class BooksModule {}
