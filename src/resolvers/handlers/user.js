import Joi from 'joi';
import { Types } from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { User } from './../../data/models';
import { singUp, singIn } from './../../data/schemas';
import { isAuthenticated, isNotAuthenticated, authUser } from './../../hooks/auth';

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
    return User.create(args);
  },

  singIn: async (root, args, { req }, info) => {
    const { userId } = req.session;

    if (useId) {
      return User.findById(userId);
    }

    await Joi.validate(args, singIn, { abortEarly: false });

    const { email, password } = args;
    const user = authUser(email, password);


    return user;
  },

  singOut: (root, args, { req }, info) => {

  },
};

export default {
  Query: Query,
  Mutation: Mutation,
};