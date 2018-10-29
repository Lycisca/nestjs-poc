import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsInterface, CatsServiceInterface } from './cats.interface';

class CatsServiceMock implements CatsServiceInterface {
  index(): Promise<CatsInterface[]> {
    throw new Error('Method not implemented.');
  }
  show(catId: number): Promise<CatsInterface> {
    throw new Error('Method not implemented.');
  }
  create(
    createCatDto: import('/home/nury/src/nestjs-poc/src/cats/dto/create-cat.dto').CreateCatDto,
  ): Promise<CatsInterface> {
    throw new Error('Method not implemented.');
  }
  update(
    catId: number,
    updateCatDto: import('/home/nury/src/nestjs-poc/src/cats/dto/update-cat-dto').UpdateCatDto,
  ): Promise<CatsInterface> {
    throw new Error('Method not implemented.');
  }
  delete(catId: number): Promise<CatsInterface> {
    throw new Error('Method not implemented.');
  }
}

describe('CatsController', () => {
  let catsServiceMock: CatsServiceMock = new CatsServiceMock();
  let controller: CatsController = new CatsController(catsServiceMock);

  const catExample: CatsInterface = { age: 32, name: 'NuryCat', user_id: 1 };

  // TODO: Doc NEstJS
  // let controller: CatsController;
  // let catsServiceMock: CatsServiceMock;

  // beforeEach(async () => {
  //   const module = await Test.createTestingModule({
  //     controllers: [CatsController],
  //     providers: [CatsServiceMock]
  //   }).compile();

  //   controller = module.get(CatsController);
  //   catsServiceMock = module.get(CatsServiceMock);
  // });

  describe('InstanceCatsController', () => {
    it('instance controller should be controller', async () => {
      expect(controller).toBeInstanceOf(CatsController);
    });
  });

  describe('index', () => {
    it('should return an array of cats', async () => {
      const result = [];
      jest.spyOn(catsServiceMock, 'index').mockImplementation(() => result);
      expect(await controller.index()).toBe(result);
    });
  });

  describe('show', () => {
    it('should return a cat', async () => {
      jest.spyOn(catsServiceMock, 'show').mockImplementation(() => catExample);
      expect(await controller.show(1)).toBe(catExample);
    });
  });

  describe('create', () => {
    it('should return a new cat', async () => {
      jest
        .spyOn(catsServiceMock, 'create')
        .mockImplementation(() => catExample);

      expect(await controller.create(catExample)).toBe(catExample);
    });
  });

  describe('update', () => {
    it('should return a updated cat', async () => {
      jest
        .spyOn(catsServiceMock, 'update')
        .mockImplementation(() => ({ id: 1, ...catExample }));

      expect(await controller.update(1, catExample)).toEqual({
        id: 1,
        ...catExample,
      });
    });
  });

  describe('destroy', () => {
    it('should return a updated cat', async () => {
      jest
        .spyOn(catsServiceMock, 'delete')
        .mockImplementation(() => catExample);

      expect(await controller.delete(1)).toEqual(catExample);
    });
  });
});
