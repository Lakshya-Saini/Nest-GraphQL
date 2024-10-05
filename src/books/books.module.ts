import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.schema';
import { Author, AuthorSchema } from '../authors/authors.schema';
import { AuthorsModule } from '../authors/authors.module';
import { AuthorsService } from '../authors/authors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
    forwardRef(() => AuthorsModule),
  ],
  providers: [BooksService, BooksResolver, AuthorsService],
})
export class BooksModule {}
