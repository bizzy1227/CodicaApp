import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ id });
    
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne(id, { relations: ['transactions'] });

    if (category.transactions.length) {
      throw new ForbiddenException('Current category has transactions');
    }

    await this.categoryRepository.delete(id);
  }
}
