const Redis = require('ioredis');

export class RedisService {
  redis: any;
  constructor() {
    this.redis = new Redis();
  }

  redisFetch(key, promise, time?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, dataRedis) => {
        if (err || !dataRedis) {
          promise
            .then(data => {
              if (time) {
                this.redis.set(key, JSON.stringify(data), 'EX', time);
              } else {
                this.redis.set(key, JSON.stringify(data));
              }
              resolve(data);
            })
            .catch(reject);
        } else {
          resolve(JSON.parse(dataRedis));
        }
      });
    });
  }
}
