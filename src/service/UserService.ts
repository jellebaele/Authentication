import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { IUserDocument, IUserDto } from '../model/User';
import InternalServerError from '../error/implementations/InternalServerError';

export default class UserService {
  public async createUser(user: IUserDto): Promise<IUserDocument> {
    const userDto: IUserDto = {
      username: user.username,
      password: user.password,
      isAdmin: false,
    };

    const newUser = await new UserModel(userDto).save();

    if (!newUser) {
      throw new InternalServerError(
        'Something went wrong. User is not created.'
      );
    }

    return newUser;
  }

  public async getAllUsers(limit = 100): Promise<(IUserDocument | null)[]> {
    const users = await UserModel.find().limit(limit);

    return users;
  }

  public async getUserById(id: string): Promise<IUserDocument | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return user;
  }

  public async getUserByUsername(username: string) {
    const user = await UserModel.findOne({ username: username });

    if (!user) return null;

    return user;
  }

  public async updateUserById(
    id: string,
    query: FilterQuery<IUserDocument>,
    options: QueryOptions<unknown>
  ): Promise<IUserDocument | null> {
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, query, {
      ...options,
      new: true,
    });

    return updatedUser;
  }

  public async deleteUserById(id: string): Promise<boolean> {
    const deletedUser = await UserModel.deleteOne({ _id: id });

    return !!deletedUser;
  }
}
