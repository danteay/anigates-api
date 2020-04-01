import redis from 'redis';
import { REDISCLOUD_URL } from './../../config';

export default () => {
  return redis.createClient(REDISCLOUD_URL);
};