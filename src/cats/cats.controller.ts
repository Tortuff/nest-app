import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CatCreateDto } from './dto/cat-create.dto';

@Controller('cats')
export class CatsController {
  constructor(private catSevice: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catSevice.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CatCreateDto): Promise<void> {
    return this.catSevice.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    return `This action returns a #${
      params.id
    } cat. Type of ID is ${typeof params.id}`;
  }
}
