import { FilterQuery, QueryOptions } from 'mongoose';
import UserModel, { IUserDocument, IUserDto } from '../model/User';
import InternalServerError from '../error/implementations/InternalServerError';

export default class UserService {
  public async createUser(user: IUserDto): Promise<IUserDocument | Error> {
    const userDto: IUserDto = {
      username: user.username,
      password: user.password,
      isAdmin: false,
    };

    const newUser = await new UserModel(userDto).save();

    const result = this.omitPropertiesUser(newUser.toObject());
    if (!result) {
      throw new InternalServerError(
        'Something went wrong. User is not created.'
      );
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

  public async getUserByUsername(
    username: string
  ): Promise<IUserDocument | null> {
    const user = await UserModel.findOne({ username: username }).lean();
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

    return this.omitPropertiesUser(updatedUser as IUserDocument);
  }

  public async deleteUserById(id: string): Promise<boolean> {
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
}
