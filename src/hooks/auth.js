import { AuthenticationError } from 'apollo-server-express';
import { User } from './../data/models';
import { SESS_NAME } from './../config';
import { compare } from 'bcryptjs';

export const authUser = async (email, password) => {
  const user = User.findOne({email: email});

  if (!user) {
    throw new AuthenticationError('Not found user');
  }

  if (!await compare(password, user.password)) {
    throw new AuthenticationError('Invalid password');
  }

  return user;
};

export const singOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if (err) reject(err);

    res.clearCookie(SESS_NAME);
    resolve(true);
  });
});

const signedIn = req => req.session.userId;

export const isAuthenticated = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('User is not logged in');
  }
};

export const isNotAuthenticated = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('User is logged in');
  }
};