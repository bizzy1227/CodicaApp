import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateUpdateCategoryDto
  ): Promise<void> {
    this.logger.log('create: create category');
    this.logger.log(JSON.stringify(createCategoryDto));
    await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    this.logger.log('findAll: find all categories');
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    this.logger.log(`findOne: find category with id: ${id}`);
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateUpdateCategoryDto
  ): Promise<void> {
    this.logger.log(`update: update category with id: ${id}`);
    this.logger.log(JSON.stringify(updateCategoryDto));
    await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`remove: remove bank with id: ${id}`);
    await this.categoryService.remove(+id);
  }
}
