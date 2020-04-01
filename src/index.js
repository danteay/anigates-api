import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import mongo from './data/clients/mongo';
import redis from './data/clients/redis';

import { PORT, NODE_ENV, sessionConf } from './config';

const db = mongo();

const app = express();
app.disable("x-powered-by");

const RedisStore = connectRedis(session);
const store = new RedisStore({client: redis()});

app.use(session({store, ...sessionConf}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: NODE_ENV === 'development',
  playground: NODE_ENV !== 'production',
  context: ({req, res}) => ({req, res}),
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  if (NODE_ENV === "development") {
    console.log(
      `Server started at: http://localhost:${PORT}${server.graphqlPath}`
    );
  }
});
