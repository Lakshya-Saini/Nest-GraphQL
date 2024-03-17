import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRentalInput, FindRentalInput, Rental, RentalDocument } from './rental.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RentalsService {
  constructor(@InjectModel(Rental.name) private rentalModel: Model<RentalDocument>) {}

  async getAllRentals(params: FindRentalInput) {
    const rentals = await this.rentalModel.find(params || {}).exec();
    if (!rentals.length) {
      throw new NotFoundException('No rentals found');
    }
    return rentals;
  }

  async findRentalById(id: string) {
    const rental = await this.rentalModel.findById(id).exec();
    if (!rental._id) {
      throw new NotFoundException('Rental details not found');
    }
    return rental;
  }

  async findByBookId(id: string | number) {
    const rental = await this.rentalModel.find().where('bookIds').in([id]).exec();
    if (!rental.length) {
      throw new NotFoundException('Rental details not found');
    }
    return rental;
  }

  async findByUserId(id: string | number) {
    const rental = await this.rentalModel.find({ userId: id }).exec();
    if (!rental.length) {
      throw new NotFoundException('Rental details not found');
    }
    return rental;
  }

  async createRental(params: CreateRentalInput) {
    const userId = params.userId ? new Types.ObjectId(params.userId) : null;
    const bookIds = params.bookIds ? params.bookIds.map((id) => new Types.ObjectId(id)) : [];
    delete params['userId'];
    delete params['bookIds'];

    const rental = await this.rentalModel.create({
      ...params,
      userId: userId,
      bookIds: bookIds,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    if (!rental._id) {
      throw new HttpException('Failed to create rental', 417);
    }

    return rental;
  }

  async deleteRental(id: string) {
    const rental = await this.rentalModel.findByIdAndDelete(id).exec();
    return rental;
  }
}
