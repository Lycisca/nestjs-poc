import { BreedsService } from './breeds.service';
import axios from 'axios';

describe('BreedsService', () => {
  it('#new', async () => {
    expect(new BreedsService(axios)).toBeInstanceOf(BreedsService);
  });

  it('#index with function mock', async () => {
    const requestMock: any = {
      create: () => ({
        get: async (url: string) => ({
          data: { data: [] },
        }),
      }),
    };
    const breeds = await new BreedsService(requestMock).index();
    expect(breeds).toBeInstanceOf(Array);
  });
});
