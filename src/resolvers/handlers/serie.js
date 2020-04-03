import { Types } from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { Serie } from './../../data/models';
import { createSerieScheme } from './../../data/schemas';

const Query = {
  serie: async (root, args, context, info) => {
    if (!Types.ObjectId.isValid(args.id)) {
      throw new UserInputError('invalid data');
    }

    return await Serie.findById(args.id);
  },
};

const Mutation = {
  createSerie: async (root, args, context, info) => {
    await createSerieScheme.validate(args);
  }
};

export default {
  Query: Query,
  Mutation: Mutation,
};
