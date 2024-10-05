import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Book,
  BookDocument,
  CreateBookInput,
  FindBookInput,
  UpdateBookInput,
} from './books.schema';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private authorService: AuthorsService,
  ) {}

  async getAllBooks(params: FindBookInput) {
    const books = await this.bookModel.find(params || {}).exec();
    if (!books.length) {
      throw new NotFoundException('No books found');
    }
    return books;
  }

  async findBookById(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book._id) {
      throw new NotFoundException('Book details not found');
    }
    return book;
  }

  async findByAuthorId(id: string | number) {
    const books = await this.bookModel
      .find()
      .where('authorIds')
      .in([id])
      .exec();
    if (!books.length) {
      throw new NotFoundException('Book details not found');
    }
    return books;
  }

  async findByRentalId(id: string | number) {
    const books = await this.bookModel
      .find()
      .where('rentalIds')
      .in([id])
      .exec();
    if (!books.length) {
      throw new NotFoundException('Book details not found');
    }
    return books;
  }

  async createBook(params: CreateBookInput) {
    const authorIds =
      params.authorIds?.map((id) => new Types.ObjectId(id)) || [];

    const book = await this.bookModel.create({
      ...params,
      authorIds,
      rentalIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    if (!book._id) {
      throw new HttpException('Failed to create book', 417);
    }

    if (params.authorIds && params.authorIds.length) {
      for (let i = 0; i < params.authorIds.length; i++) {
        await this.authorService.updateAuthor(params.authorIds[i], {
          bookIds: [book._id.toString()],
        });
      }
    }

    return book;
  }

  async updateBook(id: string, params: UpdateBookInput) {
    const authorIds =
      params.authorIds && params.authorIds.map((id) => new Types.ObjectId(id));
    const rentalIds =
      params.rentalIds && params.rentalIds.map((id) => new Types.ObjectId(id));
    delete params['authorIds'];
    delete params['rentalIds'];

    const toUpdate = {};
    if (authorIds && authorIds.length) {
      toUpdate['authorIds'] = { $each: authorIds };
    }
    if (rentalIds && rentalIds.length) {
      toUpdate['rentalIds'] = { $each: rentalIds };
    }

    const book = await this.bookModel
      .updateOne({ _id: id }, { ...params, $push: toUpdate })
      .exec();
    if (book.modifiedCount == 0) {
      throw new HttpException('Failed to update book', 417);
    }
    return await this.findBookById(id);
  }

  async deleteBook(id: string) {
    const book = await this.bookModel.findByIdAndDelete(id).exec();
    return book;
  }
}
