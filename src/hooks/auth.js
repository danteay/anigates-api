import { AuthenticationError } from 'apollo-server-express';

export const authUser = (email, password) => {

};

export const isAuthenticated = req => {
  if (!req.session.userId) {
    throw new AuthenticationError('User is not logged in');
  }
};

export const isNotAuthenticated = req => {
  if (req.session.userId) {
    throw new AuthenticationError('User is not logged in');
  }
};