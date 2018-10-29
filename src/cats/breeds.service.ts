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
  constructor(private readonly requester: Requester) {}
  async index(limit: number = 100): Promise<Breed[]> {
    const { data } = await this.requester.get(
      `https://catfact.ninja/breeds?limit=${limit}`,
    );
    return data.data;
  }
}
