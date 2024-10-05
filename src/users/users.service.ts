import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateUserInput,
  FindUserInput,
  UpdateUserInput,
  User,
  UserDocument,
} from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(params: FindUserInput) {
    const users = await this.userModel.find(params || {}).exec();
    if (!users.length) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user._id) {
      throw new NotFoundException('User details not found');
    }
    return user;
  }

  async findByRentalId(id: string | number) {
    const users = await this.userModel
      .find()
      .where('rentalIds')
      .in([id])
      .exec();
    if (!users.length) {
      throw new NotFoundException('User details not found');
    }
    return users[0];
  }

  async createUser(params: CreateUserInput) {
    const user = await this.userModel.create({
      ...params,
      rentalIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    if (!user._id) {
      throw new HttpException('Failed to create user', 417);
    }
    return user;
  }

  async updateUser(id: string, params: UpdateUserInput) {
    const rentalIds =
      params.rentalIds && params.rentalIds.map((id) => new Types.ObjectId(id));
    delete params['rentalIds'];

    const user = await this.userModel
      .updateOne(
        { _id: id },
        { ...params, $push: { rentalIds: { $each: rentalIds } } },
      )
      .exec();
    if (user.modifiedCount == 0) {
      throw new HttpException('Failed to update user', 417);
    }
    return await this.findUserById(id);
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return user;
  }
}
