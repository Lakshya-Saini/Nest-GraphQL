import { Args, Resolver, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Author, CreateAuthorInput, FindAuthorInput, UpdateAuthorInput } from './author.schema';
import { AuthorsService } from './authors.service';
import { BooksService } from '../books/books.service';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorService: AuthorsService, private bookService: BooksService) {}

  @Query(() => [Author], { name: 'authors' })
  async getAllAuthors(@Args('params') params: FindAuthorInput): Promise<Author[] | void> {
    return await this.authorService.getAllAuthors(params);
  }

  @Query(() => Author, { name: 'author' })
  async findAuthorById(@Args('params') { _id }: FindAuthorInput): Promise<Author | void> {
    return await this.authorService.findAuthorsById(_id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('params') author: CreateAuthorInput) {
    return this.authorService.createAuthor(author);
  }

  @Mutation(() => Author)
  async updateAuthor(@Args('id') id: string, @Args('params') author: UpdateAuthorInput) {
    return this.authorService.updateAuthor(id, author);
  }

  @Mutation(() => Author)
  async deleteAuthor(@Args('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }

  @ResolveField(() => Author)
  async bookIds(@Parent() parent: Author) {
    return await this.bookService.findByAuthorId(parent._id);
  }
}
