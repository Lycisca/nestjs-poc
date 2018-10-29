import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UsePipes,
} from '@nestjs/common';
// import { CatsService } from './cats.service';
// import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat-dto';
// import { ValidationCat } from '../pipes/validation.pipe';
import { CatsServiceInterface } from './cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsServiceInterface) {}

  @Get()
  async index() {
    return this.catsService.index();
  }

  @Get(':id')
  // @UsePipes(new ValidationUser())
  async show(@Param('id') CatId: number) {
    return this.catsService.show(CatId);
  }

  @Post()
  // @UsePipes(new ValidationUser())
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  // @UsePipes(new ValidationUser())
  async update(@Param('id') CatId: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(CatId, updateCatDto);
  }

  @Delete(':id')
  // @UsePipes(new ValidationUser())
  async delete(@Param('id') CatId: number) {
    return this.catsService.delete(CatId);
  }
}
