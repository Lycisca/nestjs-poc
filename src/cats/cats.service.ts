import { CatsServiceInterface } from './cats.interface';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats-dto';

export class CatsService implements CatsServiceInterface {
  constructor(private catsRepository) {}

  index() {
    return this.catsRepository.findAll();
  }

  show() {
    return this.catsRepository.findById();
  }

  async create(createCatDto: CreateCatsDto) {
    return this.catsRepository.create(createCatDto);
  }

  async update(catId: number, updateCatDto: UpdateCatsDto) {
    const cat = this.catsRepository.findById(catId);
    return cat.update(updateCatDto);
  }

  async delete(catId: number) {
    return this.catsRepository.delete(catId);
  }
}
