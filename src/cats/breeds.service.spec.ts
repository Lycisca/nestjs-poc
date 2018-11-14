import { BreedsService } from './breeds.service';

jest.mock('axios');
const axios = require('axios');

class RedisServiceMock {
  redisFetch(key, promise, time?) {
    return promise;
  }
}

describe('BreedsService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('#new', async () => {
    const service = new BreedsService(axios, new RedisServiceMock());
    expect(service).toBeInstanceOf(BreedsService);
  });

  it('#index with function mock', async () => {
    const requestMock = {
      get: async (url: string) => ({
        data: { data: [] },
      }),
    };
    const service = new BreedsService(requestMock, new RedisServiceMock());
    const breeds = await service.index();
    expect(breeds).toBeInstanceOf(Array);
  });
});
