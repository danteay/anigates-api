import { NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './env';
import { isEmpty } from './utils/validations';

export const sessionConf = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: !isEmpty(SESS_LIFETIME) ? parseInt(SESS_LIFETIME) : 100 * 60 * 60 * 2,
    sameSite: true,
    secure: NODE_ENV === "production"
  }
};
