import { BreedsService } from './breeds.service';
jest.mock('axios');
const axios = require('axios');

describe('BreedsService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('#new', async () => {
    expect(new BreedsService(axios)).toBeInstanceOf(BreedsService);
  });

  it('#index', async () => {
    axios.get.mockImplementation(async (url: string) => ({
      data: { data: [{ breed: 'Mock breed' }] },
    }));
    const breeds = await new BreedsService(axios).index();
    console.log('breeds', breeds);
    expect(breeds).toBeInstanceOf(Array);
  });

  it('#index with empty array', async () => {
    axios.get.mockImplementation(async (url: string) => ({
      data: { data: [] },
    }));
    const breeds = await new BreedsService(axios).index();
    console.log('breeds', breeds);
    expect(breeds).toBeInstanceOf(Array);
  });

  it('#index with function mock', async () => {
    const requestMock = {
      get: async (url: string) => ({
        data: { data: [] },
      }),
    };
    const breeds = await new BreedsService(requestMock).index();
    console.log('breeds', breeds);
    expect(breeds).toBeInstanceOf(Array);
  });
});
