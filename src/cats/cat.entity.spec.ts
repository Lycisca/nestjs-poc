import { Cat, catsProviders } from './cat.entity';
import { databaseProviders } from '../databases/database.providers';

describe('Cats Entity', () => {
  it('cats entity', async () => {
    databaseProviders[0].useFactory(); //need initialize sequelize before use repository
    const entity = new Cat();
    expect(entity).toBeInstanceOf(Cat);
  });

  it('cats repositorySQL', async () => {
    databaseProviders[0].useFactory(); //need initialize sequelize before use repository

    const repositorySQL = catsProviders[0];
    expect(repositorySQL.provide).toEqual('CatsRepository');
    expect(repositorySQL.useValue).toBe(Cat);
  });
});
