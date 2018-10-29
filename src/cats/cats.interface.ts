import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat-dto';

export interface CatsInterface {
  name: string;
  age: number;
  user_id: number;
}

export interface CatsServiceInterface {
  index(): Promise<Array<CatsInterface>>;
  show(catId: number): Promise<CatsInterface>;
  create(createCatDto: CreateCatDto): Promise<CatsInterface>;
  update(catId: number, updateCatDto: UpdateCatDto): Promise<CatsInterface>;
  delete(catId: number): Promise<CatsInterface>;
}
