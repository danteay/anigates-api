import Joi from 'joi';
import { Types } from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { User } from './../../data/models';
import { singUp, singIn } from './../../data/schemas';
import { isAuthenticated, isNotAuthenticated, authUser, singOut } from './../../hooks/auth';

const Query = {
  // TODO: is_auth, projection, pagination, sanitization

  me: (root, args, { req }, info) => {
    isAuthenticated(req);
    return User.findById(req.session.userId);
  },

  user: (root, args, { req }, info) => {
    isAuthenticated(req);

    if (Types.ObjectId.isValid(args.id)) {
      throw new UserInputError('Invalid user data');
    }

    return User.findById(args.id);
  },

  users: (root, args, { req }, info) => {
    isAuthenticated(req);
    return User.find({});
  },
};

const Mutation = {
  singUp: async (root, args, {req}, info) => {
    isNotAuthenticated(req);

    await Joi.validate(args, singUp, { abortEarly: false });

    const user = await User.create(args);
    req.session.userId = user.id;

    return user;
  },

  singIn: async (root, args, { req }, info) => {
    const { userId } = req.session;

    if (userId) {
      return User.findById(userId);
    }

    await Joi.validate(args, singIn, { abortEarly: false });

    const { email, password } = args;
    const user = await authUser(email, password);

    req.session.userId = user.id;

    return user;
  },

  singOut: (root, args, { req, res }, info) => {
    isNotAuthenticated(req);
    return singOut(req, res)
  },
};

export default {
  Query: Query,
  Mutation: Mutation,
};