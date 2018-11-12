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
  constructor(requester: AxiosStatic) {
    this.request = requester.create({
      baseURL: 'https://catfact.ninja/breeds',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' },
    });
  }
  async index(params = { limit: 100 }): Promise<Breed[]> {
    const { data } = await this.request.get(`/breeds`, { params });
    return data.data;
  }
}
