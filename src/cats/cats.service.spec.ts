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

  static findById() {
    return { name: 'cat3' };
  }

  static create(catParams) {
    return catParams;
  }

  update(catParams) {
    return catParams;
  }
}

class CatRepositoryMockUpdate {
  static findById(catId) {
    return new CatRepositoryMockUpdate();
  }

  update(catParams) {
    return catParams;
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

  it('test interface index', async () => {
    const repo = CatRepositoryMock;
    const catsService = catsServiceFactory(CatRepositoryMock);
    const cats = await catsService.index();
    expect(cats).toEqual([{ name: 'cat2' }]);
  });

  it('test interface show', async () => {
    const repo = CatRepositoryMock;
    const catsService = catsServiceFactory(CatRepositoryMock);
    const cats = await catsService.show();
    expect(cats).toEqual({ name: 'cat3' });
  });

  it('test interface create', async () => {
    const repo = CatRepositoryMock;
    const catsService = catsServiceFactory(repo);
    const catParams = { name: 'cat4', age: 1 };
    const cat = await catsService.create(catParams);
    expect(cat).toEqual(catParams);
  });

  it('test interface update', async () => {
    const repo = CatRepositoryMockUpdate;
    const catsService = catsServiceFactory(repo);
    const catParams = { age: 2 };
    const cat = await catsService.update(1, catParams);
    expect(cat.age).toEqual(2);
  });
});
