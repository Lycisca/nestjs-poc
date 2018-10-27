import { CatsServiceInterface } from './cats.interface';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats-dto';

export class CatsService implements CatsServiceInterface {
  constructor(private usersRepository) {}

  index() {
    return this.usersRepository.findAll();
  }

  show() {
    return this.usersRepository.findById();
  }

  async create(createCatDto: CreateCatsDto) {
    return { name: 'string', age: 1, user_id: 1 };
  }

  async update(catId: number, updateCatDto: UpdateCatsDto) {
    return { name: 'string', age: 1, user_id: 1 };
  }

  async delete(catId: number) {
    return { name: 'string', age: 1, user_id: 1 };
  }
}
