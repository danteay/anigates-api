import { NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './env';
import { isEmpty } from './utils/validations';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';

export const sessionConf = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: !isEmpty(SESS_LIFETIME) ? parseInt(SESS_LIFETIME) : 100 * 60 * 60 * 2,
    sameSite: true,
    secure: NODE_ENV === 'production',
  },
};

export const apolloConf = {
  typeDefs,
  resolvers,
  schemaDirectives,
  tracing: NODE_ENV !== 'production',
  playground:
    NODE_ENV === 'production'
      ? false
      : {
          settings: {
            'request.credentials': 'include',
          },
        },
  context: ({ req, res }) => ({ req, res }),
};
