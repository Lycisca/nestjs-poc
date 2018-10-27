import { IFindOptions, Model } from 'sequelize-typescript';
import { CatsService } from './cats.service';
import { CatsServiceInterface } from './cats.interface';
import { databaseProviders } from '../databases/database.providers';

// class CatRepositoryMock implements CatsServiceInterface {
//   static findAll<T extends Model<T>>(
//     this: new () => T,
//     options?: IFindOptions<T>,
//   ): any {
//     return [{ name: 'cat' }];
//   }
// }

const catsServiceFactory = (CatRepository = undefined) => {
  return new CatsService();
};

describe('Cats Service', () => {
  it('cats service', async () => {
    const service = new CatsService();
    expect(service).toBeInstanceOf(CatsService);
  });

  it('test interface', async () => {
    // const repo = CatRepositoryMock;
    const catsService = catsServiceFactory();
    const cats = await catsService.index();
    expect(cats).toEqual([{ name: 'cat' }]);
  });
});
