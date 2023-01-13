import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';

const categories = [
  {
    id: 1,
    name: 'Test1',
  },
];

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let repositoryCategory: Repository<Category>;

  const repositoryTokenCategory = getRepositoryToken(Category);
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      CategoryService,
        {
          provide: repositoryTokenCategory,
          useValue: {
            find: jest.fn().mockImplementation(() => []),
            findOne: jest.fn().mockImplementation((id) => categories.find(b => b.id === id)),
          },
        },
      ],
    }).compile();

    repositoryCategory = module.get(repositoryTokenCategory);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
    expect(repositoryCategory).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await categoryService.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be return bank with id: 1', async () => {
      const result = await categoryService.findOne(1);
      expect(result).toBe(categories[0]);
    });

    it('should be throw NotFoundException', async () => {
      await expect(categoryService.findOne(2)).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });
  });

  describe('update', () => {
    it('should be throw NotFoundException', async () => {
      await expect(categoryService.update(2, new CreateUpdateCategoryDto())).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });
  });

  describe('remove', () => {
    it('should be throw ForbiddenException', async () => {
      await expect(categoryService.remove(1)).rejects.toThrow(
        new ForbiddenException('Current category has transactions'),
      );
    });
  });
});
