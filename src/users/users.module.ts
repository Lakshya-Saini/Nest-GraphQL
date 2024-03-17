import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { Rental, RentalSchema } from '../rentals/rental.schema';
import { RentalsService } from '../rentals/rentals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Rental.name, schema: RentalSchema },
    ]),
  ],
  providers: [UsersService, UsersResolver, RentalsService],
})
export class UsersModule {}
