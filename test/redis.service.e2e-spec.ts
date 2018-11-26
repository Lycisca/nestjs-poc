import { withRedisCache, RedisService } from '../src/cache/redis.service';
const Redis = require('ioredis');

const redis = new Redis();

class Dummy {
  @withRedisCache('cache-key', 100)
  async index() {
    return [1, 2, 3];
  }
  @withRedisCache(limit => `cache-key-${limit}`, 100)
  async indexLimit(limit) {
    return [1, 2, 3, 4, 5];
  }
}

describe('withRedisCache', () => {
  it('#withRedisCache decorator function', async done => {
    const dummy = new Dummy();
    redis.del('cache-key', async () => {
      const data = await dummy.index();
      expect(data).toEqual([1, 2, 3]);
      redis.get('cache-key', (_err, redisData) => {
        expect(redisData).toEqual('[1,2,3]');
      });
      done();
    });
  });

  it('#withRedisCache decorator function', async done => {
    const dummy = new Dummy();
    redis.del('cache-key-10', async () => {
      const data = await dummy.indexLimit(10);
      expect(data).toEqual([1, 2, 3, 4, 5]);
      redis.get('cache-key-10', (_err, redisData) => {
        expect(redisData).toEqual('[1,2,3,4,5]');
        done();
      });
    });
  });
});

describe('RedisService', () => {
  it('#new', () => {
    expect(new RedisService()).toBeInstanceOf(RedisService);
  });

  it('#redisFetch', async () => {
    const redisService = new RedisService();
    const promise = new Promise((resolve, reject) => {
      resolve('data-to-cache');
    });
    expect(
      await redisService.redisFetch('cache-key-string', promise, 100),
    ).toEqual('data-to-cache');
  });

  it('#redisFetch object', async () => {
    const redisService = new RedisService();
    const promise = new Promise((resolve, reject) => {
      resolve({ id: 4 });
    });
    expect(
      await redisService.redisFetch('cache-key-obj', promise, 100),
    ).toEqual({ id: 4 });
  });
});
