import { BreedsService } from './breeds.service';
jest.mock('axios');
const axios = require('axios');

describe('BreedsService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('#new', async () => {
    expect(new BreedsService()).toBeInstanceOf(BreedsService);
  });

  it('#index', async () => {
    axios.get.mockImplementation(async (url: string) => ({
      data: { data: [{ breed: 'Mock breed' }] },
    }));
    const breeds = await new BreedsService().index();
    console.log('breeds', breeds);
    expect(breeds).toBeInstanceOf(Array);
  });

  it('#index with empty array', async () => {
    axios.get.mockImplementation(async (url: string) => ({
      data: { data: [] },
    }));
    const breeds = await new BreedsService().index();
    console.log('breeds', breeds);
    expect(breeds).toBeInstanceOf(Array);
  });
});
