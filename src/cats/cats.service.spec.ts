import { IFindOptions, Model } from 'sequelize-typescript';
import { CatsService } from './cats.service';
import { CatsServiceInterface } from './cats.interface';
import { databaseProviders } from '../databases/database.providers';

class CatRepositoryMock {
  static findAll<T extends Model<T>>(
    this: new () => T,
    options?: IFindOptions<T>,
  ): any {
    return [{ name: 'cat2' }];
  }
}

const catsServiceFactory = (CatRepository = undefined) => {
  return new CatsService(CatRepository);
};

describe('Cats Service', () => {
  it('cats service', async () => {
    const service = new CatsService(CatRepositoryMock);
    expect(service).toBeInstanceOf(CatsService);
  });

  it('test interface', async () => {
    const repo = CatRepositoryMock;
    const catsService = catsServiceFactory(CatRepositoryMock);
    const cats = await catsService.index();
    expect(cats).toEqual([{ name: 'cat2' }]);
  });
});
