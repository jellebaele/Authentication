import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from '../config';
import { UserStatus } from '../utils/enums';

export interface IUserDto {
  email: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  confirmationCode?: string;
  status?: UserStatus;
}

export interface IUserDocument extends Document {
  email: string;
  username: string;
  password: string;
  // Could also be a row of ROLES (enum)
  isAdmin: boolean;
  status?: UserStatus;
  confirmationCode?: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
    status: {
      type: String,
      enum: UserStatus,
      default: UserStatus.Pending,
    },
    confirmationCode: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

UserSchema.methods.matchesPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: (doc, { __v, password, ...rest }, options) => rest,
});

UserSchema.set('toObject', {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: (doc, { __v, password, ...rest }, options) => rest,
});

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
