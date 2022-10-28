import mongoose, { Document, ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  // Could also be a row of ROLES (enum)
  isAdmin?: boolean;
}

export interface IUserDocument extends IUser, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
