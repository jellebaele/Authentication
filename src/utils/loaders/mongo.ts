import mongoose from 'mongoose';

function setupMongoose(): void {
  const dbUrl = process.env.MONGO_CONNECTION_URL || '';

  mongoose.connect(dbUrl, (err) => {
    if (err) throw err;
    console.log(`Connected to mongoDB at ${dbUrl}`);
  });
}

export default setupMongoose;
