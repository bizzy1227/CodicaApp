import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateUpdateCategoryDto): Promise<void> {
    await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      this.logger.error(`findOne: Category with id: ${id} not found`);
      this.logger.error(category);
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    
    if (!category) {
      this.logger.error(`update: Category with id: ${id} not found`);
      this.logger.error(category);
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id, { relations: ['transactions'] });

    if (category.transactions.length) {
      this.logger.error(`remove: Current category has ${category.transactions.length} transactions`);
      throw new ForbiddenException('Current category has transactions');
    }

    await this.categoryRepository.delete(id);
  }
}
