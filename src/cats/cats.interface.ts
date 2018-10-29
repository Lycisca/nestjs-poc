import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats-dto';

export interface CatsInterface {
  name: string;
  age: number;
  user_id: number;
}

export interface CatsServiceInterface {
  index(): Promise<Array<CatsInterface>>;
  show(catId: string): Promise<CatsInterface>;
  create(createCatDto: CreateCatsDto): Promise<CatsInterface>;
  update(catId: number, updateCatDto: UpdateCatsDto): Promise<CatsInterface>;
  delete(catId: number): Promise<CatsInterface>;
}
