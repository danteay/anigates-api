import { Types } from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { User } from './../../data/models';
import { singUp, singIn } from './../../data/schemas';
import { authUser, singOut } from './../../hooks/auth';

const Query = {
  // TODO: is_auth, projection, pagination, sanitization

  me: (root, args, { req }, info) => {
    return User.findById(req.session.userId);
  },

  user: (root, args, { req }, info) => {
    if (!Types.ObjectId.isValid(args.id)) {
      throw new UserInputError('Invalid user data');
    }

    return User.findById(args.id);
  },

  users: (root, args, { req }, info) => {
    return User.find({});
  },
};

const Mutation = {
  singUp: async (root, args, {req}, info) => {
    await singUp.validateAsync(args)

    const user = await User.create(args);
    req.session.userId = user.id;

    return user;
  },

  singIn: async (root, args, { req }, info) => {
    await singIn.validateAsync(args);

    const { email, password } = args;
    const user = await authUser(email, password);

    req.session.userId = user.id;

    return user;
  },

  singOut: (root, args, { req, res }, info) => {
    return singOut(req, res)
  },
};

export default {
  Query: Query,
  Mutation: Mutation,
};