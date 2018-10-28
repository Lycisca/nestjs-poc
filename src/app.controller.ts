import { Get, Controller, Res, Response, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
const request = require('request');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return 'Hello world!!!!!';
  }

  @Get('/cats_breeds')
  async breeds(@Response() response: Response) {
    request.get('https://catfact.ninja/breeds').pipe(response);
  }

  @Get('/docs/cats_breeds')
  // Error with type Response and redirect method
  async docs(@Response() response) {
    return response.redirect('https://catfact.ninja/');
  }
}
