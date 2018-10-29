import { CatsServiceInterface } from './cats.interface';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats-dto';

export class CatsService implements CatsServiceInterface {
  constructor(private catsRepository) {}

  index() {
    return this.catsRepository.findAll();
  }

  show(catId) {
    return this.catsRepository.findById(catId);
  }

  create(createCatDto: CreateCatsDto) {
    return this.catsRepository.create(createCatDto);
  }

  async update(catId: number, updateCatDto: UpdateCatsDto) {
    const cat = await this.catsRepository.findById(catId);
    return cat.update(updateCatDto);
  }

  async delete(catId: number) {
    const cat = await this.catsRepository.findById(catId);
    return cat.destroy({ force: true });
  }
}
