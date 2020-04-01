import mongoose from 'mongoose';
import { MONGODB_URI } from './../../env';

export default async () => {
  return await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};
