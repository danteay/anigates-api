import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';

import mongo from './data/clients/mongo';
import redis from './data/clients/redis';

import { sessionConf, apolloConf } from './config';
import { PORT, NODE_ENV } from './env';

mongo();

const app = express();
app.disable('x-powered-by');

const RedisStore = connectRedis(session);
const store = new RedisStore({ client: redis() });

app.use(session({ store, ...sessionConf }));

const server = new ApolloServer(apolloConf);

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  if (NODE_ENV === 'development') {
    console.log(`Server started at: http://localhost:${PORT}${server.graphqlPath}`);
  }
});
