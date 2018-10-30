import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat-dto';
import { CatsServiceInterface } from './cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsServiceInterface) {}

  @Get()
  async index() {
    return this.catsService.index();
  }

  @Get(':id')
  async show(@Param('id') CatId: number) {
    return this.catsService.show(CatId);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  async update(@Param('id') CatId: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(CatId, updateCatDto);
  }

  @Delete(':id')
  async delete(@Param('id') CatId: number) {
    return this.catsService.delete(CatId);
  }
}
