import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from '../config';

export interface IUser {
  username: string;
  password: string;
  // Could also be a row of ROLES (enum)
  isAdmin?: boolean;
  validatePassword: (password: string) => Promise<boolean>;
}

export interface IUserDto {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface IUserDocument extends IUser, Document {
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

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

UserSchema.methods.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
