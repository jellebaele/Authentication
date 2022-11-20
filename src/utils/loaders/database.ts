import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from '../../config';

function setupMongoose(): void {
  mongoose.connect(MONGO_CONNECTION_URL, (err) => {
    if (err) throw err;
    console.log('Connected to mongoDB');
  });
}

export default setupMongoose;
