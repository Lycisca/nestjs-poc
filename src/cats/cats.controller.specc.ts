// import { Test } from '@nestjs/testing';
// import { CatsController } from './cats.controller';
// import { CatsService } from './cats.service';
// import { catsProviders } from './cats.providers';
// import { DatabaseModule } from '../databases/database.module';
// import { CatsInterface } from './cats.interface'

// describe('CatsController', () => {
//   let CatsController: CatsController;
//   let CatsService: CatsService;

//   const catExample: CatsInterface = { age: 32, name: "NuryCat", user_id: 1 }

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       controllers: [CatsController],
//       providers: [CatsService, ...catsProviders],
//       imports: [DatabaseModule],
//       exports: [],
//     }).compile();

//     CatsService = module.get(CatsService);
//     CatsController = module.get(CatsController);
//   });

//   describe('index', () => {
//     it('should return an array of cats', async () => {
//       const result = ['cat1, cat2'];
//       jest.spyOn(CatsService, 'index').mockImplementation(() => result);

//       expect(await CatsController.index()).toBe(result);
//     });
//   });

//   describe('show', () => {
//     it('should return a cat', async () => {
//       jest.spyOn(CatsService, 'show').mockImplementation(() => catExample);

//       expect(await CatsController.show(1)).toBe(catExample);
//     });
//   });

//   describe('create', () => {
//     it('should return a new cat', async () => {
//       jest.spyOn(CatsService, 'create').mockImplementation(() => catExample);

//       expect(await CatsController.create(catExample)).toBe(catExample);
//     });
//   });

//   describe('update', () => {
//     it('should return a updated cat', async () => {
//       jest
//         .spyOn(CatsService, 'update')
//         .mockImplementation(() => ({ id: 1, ...catExample }));

//       expect(await CatsController.update(1, catExample)).toEqual({
//         id: 1,
//         ...catExample,
//       });
//     });
//   });

//   describe('destroy', () => {
//     it('should return a updated cat', async () => {
//       jest.spyOn(CatsService, 'destroy').mockImplementation(() => catExample);

//       expect(await CatsController.destroy(1)).toEqual(catExample);
//     });
//   });
// });
