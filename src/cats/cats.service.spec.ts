import { IFindOptions, Model } from 'sequelize-typescript';
import { CatsService } from './cats.service';
import { CatsServiceInterface } from './cats.interface';
import { databaseProviders } from '../databases/database.providers';

class CatRepositoryMock {
  static async findAll<T extends Model<T>>(
    this: new () => T,
    options?: IFindOptions<T>,
  ): Promise<any> {
    return [{ name: 'cat2' }];
  }

  static async findById() {
    return { name: 'cat3' };
  }

  static async create(catParams) {
    return catParams;
  }

  async update(catParams) {
    return catParams;
  }
}

class CatRepositoryMockUpdate {
  static async findById(catId) {
    return new CatRepositoryMockUpdate();
  }

  async update(catParams) {
    return catParams;
  }

  async delete(catId) {
    return { name: 'cat_delete' };
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
    const cats = await catsServiceFactory(CatRepositoryMock).index();
    expect(cats).toEqual([{ name: 'cat2' }]);
  });

  it('test interface show', async () => {
    const cats = await catsServiceFactory(CatRepositoryMock).show(1);
    expect(cats).toEqual({ name: 'cat3' });
  });

  it('test interface create', async () => {
    const catParams = { name: 'cat4', age: 1 };
    const cat = await catsServiceFactory(CatRepositoryMock).create(catParams);
    expect(cat).toEqual(catParams);
  });

  it('test interface update', async () => {
    const catParams = { age: 2 };
    const cat = await catsServiceFactory(CatRepositoryMockUpdate).update(
      1,
      catParams,
    );
    expect(cat.age).toEqual(2);
  });

  it('test interface delete', async () => {
    const cat = await catsServiceFactory(CatRepositoryMockUpdate).delete(1);
    expect(cat).toEqual({ name: 'cat_delete' });
  });
});
