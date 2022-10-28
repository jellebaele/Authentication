import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { IUser, IUserDocument } from '../../model/User';
import TextUtils from '../../utils/TextUtils';
import { IUserService } from '../IUserService';
import * as bcrypt from 'bcrypt';

export default class UserService implements IUserService {
  // Clean and testable: import IUserRepo in constructor

  public async createUser(user: IUser): Promise<IUserDocument | Error> {
    const { username, password } = user;

    if (!username || !password) {
      throw new Error('Username and/or password is required');
    }

    const userDto: IUser = {
      username: TextUtils.sanitize(user.username),
      password: await this.hashPassword(user.password),
      isAdmin: false,
    };

    const userNameExists = await UserModel.findOne({ username: username });
    if (userNameExists) {
      throw new Error('Username is already taken, please choose another one.');
    }

    const newUser = await new UserModel(userDto).save();

    const result = this.omitPropertiesUser(newUser.toObject());
    if (!result) {
      throw new Error('Something went wrong. User is not created.');
    }

    return result;
  }

  public async getAllUsers(limit = 100): Promise<(IUserDocument | null)[]> {
    const users = await UserModel.find().limit(limit).lean();

    return this.omitPropertiesUsers(users as IUserDocument[]);
  }

  public async getUserById(id: string): Promise<IUserDocument | null> {
    const user = await UserModel.findById(id).lean();
    if (!user) return null;

    return this.omitPropertiesUser(user as IUserDocument);
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

    if (!updatedUser) throw new Error('User not found.');

    return this.omitPropertiesUser(updatedUser as IUserDocument);
  }

  public async deleteUserById(id: string): Promise<boolean> {
    const userToDelete = await this.getUserById(id);

    if (!userToDelete) throw new Error('User not found.');

    const deletedUser = await UserModel.deleteOne({ _id: id });

    return !!deletedUser;
  }

  private omitPropertiesUser(user: IUserDocument): IUserDocument | null {
    if (!user) return null;
    Reflect.deleteProperty(user, 'password');

    return user as IUserDocument;
  }

  private omitPropertiesUsers(
    users: IUserDocument[]
  ): (IUserDocument | null)[] {
    if (!users) {
      return [];
    }

    const result = users.map((user) => {
      return this.omitPropertiesUser(user);
    });

    return result;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
