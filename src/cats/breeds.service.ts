import { Injectable } from '@nestjs/common';

export interface Breed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}
export interface Requester {
  get: (url: string) => Promise<{ data: { data: Breed[] } }>;
}

// https://catfact.ninja/#!/Breeds/breed
@Injectable()
export class BreedsService {
  constructor(
    private readonly requester: Requester,
    private readonly redisService,
  ) {}

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
