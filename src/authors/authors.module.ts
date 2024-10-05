import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './authors.schema';

@Module({
  /**
    This forFeature method is used to define which models should be registered in the 
    current module. It takes an array of objects, each containing a name and a schema.
  */
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorsService, AuthorsResolver],
})
export class AuthorsModule {}
