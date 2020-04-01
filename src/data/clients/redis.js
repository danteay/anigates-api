import redis from 'redis';
import { REDISCLOUD_URL } from './../../env';

export default () => {
  return redis.createClient(REDISCLOUD_URL);
};