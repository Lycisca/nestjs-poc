import { Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosStatic } from 'axios';

export interface Breed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

// https://catfact.ninja/#!/Breeds/breed
@Injectable()
export class BreedsService {
  request: AxiosInstance;
  constructor(
    private readonly requester: AxiosStatic,
    private readonly redisService,
  ) {
    this.request = requester.create({
      baseURL: 'https://catfact.ninja/breeds',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' },
    });
  }

  async index(limit: number = 1000): Promise<Array<Breed>> {
    return await this.redisService.redisFetch(
      `breeds-${limit}`,
      new Promise((resolve, reject) => {
        this.requester
          .get(`https://catfact.ninja/breeds?limit=${limit}`)
          .then(({ data }) => resolve(data.data));
      }),
      1000,
    );
  }
}
