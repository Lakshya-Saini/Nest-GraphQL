import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Author,
  AuthorDocument,
  CreateAuthorInput,
  FindAuthorInput,
  UpdateAuthorInput,
} from './authors.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthorsService {
  /** Inject the Mongoose model for the Author schema */
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async getAllAuthors(params: FindAuthorInput) {
    const authors = await this.authorModel.find(params || {}).exec();
    if (!authors.length) {
      throw new NotFoundException('No authors found');
    }
    return authors;
  }

  async findAuthorsById(id: string) {
    const author = await this.authorModel.findById(id).exec();
    if (!author._id) {
      throw new NotFoundException('Author details not found');
    }
    return author;
  }

  async findByBookId(id: string | number) {
    const author = await this.authorModel
      .find()
      .where('bookIds')
      .in([id])
      .exec();
    if (!author.length) {
      throw new NotFoundException('Author details not found');
    }
    return author;
  }

  async createAuthor(params: CreateAuthorInput) {
    const author = await this.authorModel.create({
      ...params,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    if (!author._id) {
      throw new HttpException('Failed to create author', 417);
    }
    return author;
  }

  async updateAuthor(id: string, params: UpdateAuthorInput) {
    const bookIds =
      params.bookIds && params.bookIds.map((id) => new Types.ObjectId(id));
    delete params['bookIds'];

    const author = await this.authorModel
      .updateOne(
        { _id: new Types.ObjectId(id) },
        { ...params, $push: { bookIds: { $each: bookIds } } },
      )
      .exec();
    if (author.modifiedCount == 0) {
      throw new HttpException('Failed to update author', 417);
    }
    return await this.findAuthorsById(id);
  }

  async deleteAuthor(id: string) {
    const author = await this.authorModel.findByIdAndDelete(id).exec();
    return author;
  }
}
