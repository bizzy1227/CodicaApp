import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryController,
        {
          provide: CategoryService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => []),
            findOne: jest.fn().mockImplementation(() => ({})),
          },
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await categoryController.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be return result', async () => {
      const result = await categoryController.findOne('1');
      expect(result).toBeDefined();
    });
  });
});
