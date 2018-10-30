import { Cat } from './cat.entity';
import { databaseProviders } from '../databases/database.providers';

describe('Cats Entity', () => {
  it('cats entity', async () => {
    databaseProviders[0].useFactory(); // need initialize sequelize before use repository
    const entity = new Cat();
    expect(entity).toBeInstanceOf(Cat);
  });
});
