import { CreateCatsDto } from "./dto/create-cats.dto";
import { UpdateCatsDto } from "./dto/update-cats-dto";

export interface CatsInterface {
  name: string,
  age: number
}

export interface CatsServiceInterface {
  index(): Array<CatsInterface>
  show(): CatsInterface
  create(createCatDto: CreateCatsDto): CatsInterface
  update(catId: number, updateCatDto: UpdateCatsDto): CatsInterface
  delete(catId: number): CatsInterface
}
