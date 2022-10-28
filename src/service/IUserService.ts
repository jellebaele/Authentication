import { FilterQuery, QueryOptions } from 'mongoose';
import { IUser, IUserDocument } from '../model/User';

export interface IUserService {
  createUser(user: IUser): Promise<IUserDocument | Error>;
  getAllUsers(limit?: number): Promise<(IUserDocument | null)[]>;
  getUserById(id: string): Promise<IUserDocument | null>;
  updateUserById(
    id: string,
    query: FilterQuery<IUserDocument>,
    options?: QueryOptions
  ): Promise<IUserDocument | null>;
  deleteUserById(id: string): Promise<boolean | null>;
}
