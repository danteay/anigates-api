import { AuthenticationError } from 'apollo-server-express';
import { User } from './../data/models';
import { SESS_NAME } from './../config';

export const authUser = async (email, password) => {
  const user = User.findOne({email: email});

  if (!user) {
    throw new AuthenticationError('Not found user');
  }

  console.log(user);

  const match = await user.comparePassword(password);

  if (!match) {
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