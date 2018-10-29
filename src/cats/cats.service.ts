import { CatsServiceInterface } from './cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat-dto';

export class CatsService implements CatsServiceInterface {
  constructor(private catsRepository) {}

  index() {
    return this.catsRepository.findAll();
  }

  show(catId) {
    return this.catsRepository.findById(catId);
  }

  create(createCatDto: CreateCatDto) {
    return this.catsRepository.create(createCatDto);
  }

  async update(catId: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findById(catId);
    return cat.update(updateCatDto);
  }

  async delete(catId: number) {
    const cat = await this.catsRepository.findById(catId);
    return cat.destroy({ force: true });
  }
}
