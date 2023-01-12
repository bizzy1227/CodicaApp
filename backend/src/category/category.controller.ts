import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateUpdateCategoryDto
  ): Promise<void> {
    await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateUpdateCategoryDto
  ): Promise<void> {
    await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(+id);
  }
}
