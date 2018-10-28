import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface Breed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

// https://catfact.ninja/#!/Breeds/breed
@Injectable()
export class BreedsService {
  async index(limit: number = 100): Promise<Breed> {
    const { data } = await axios.get(
      `https://catfact.ninja/breeds?limit=${limit}`,
    );
    return data.data;
  }
}
