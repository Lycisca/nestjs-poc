import { Get, Controller, Res, Response, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BreedsService } from './cats/breeds.service';

// const request = require('request');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly breedsService: BreedsService,
  ) {}

  @Get()
  root(): string {
    return 'Hello world!!!!!';
  }

  @Get('/cats_breeds')
  async breeds(): Promise<Array<any>> {
    return this.breedsService.index(100);
    // request.get('https://catfact.ninja/breeds').pipe(response);
  }

  @Get('/docs/cats_breeds')
  // Error with type Response and redirect method
  async docs(@Response() response) {
    return response.redirect('https://catfact.ninja/');
  }
}
