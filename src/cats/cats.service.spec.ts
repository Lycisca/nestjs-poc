import { IFindOptions, Model } from 'sequelize-typescript';
import { CatsService } from './cats.service';
import { CatsServiceInterface } from './cats.interface';
import { databaseProviders } from '../databases/database.providers';

// class CatMock implements CatsServiceInterface {
//   static findAll<T extends Model<T>>(
//     this: new () => T,
//     options?: IFindOptions<T>,
//   ): any {
//     return [{ firstName: 'cat' }];
//   }
// }

// const catsServiceFactory = CatRepository => {
//   // databaseProviders[0].useFactory();
//   // return new CatsService(CatRepository);
// };

describe('Cats Service', () => {
  it('cats service', async () => {
    const service = new CatsService();
    expect(service).toBeInstanceOf(CatsService);
  });

  // it('test interface', async () => {
  //   const repo = UserMock;
  //   const usersService = usersServiceFactory(repo);
  //   const users = await usersService.index();
  //   expect(users).toEqual([{ firstName: 'user' }]);
  // });
});
