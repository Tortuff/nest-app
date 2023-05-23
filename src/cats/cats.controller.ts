import { Body, Controller, ForbiddenException, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CatCreateDto } from './dto/cat-create.dto';

@Controller('cats')
export class CatsController {
  constructor(private catSevice: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll(): any {
    //throw new ForbiddenException();
    //throw new HttpException('Some custom message', HttpStatus.FORBIDDEN);
    return this.catSevice.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CatCreateDto): Promise<void> {
    return this.catSevice.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    //throw new Error('Unexpected error');
    return `This action returns a #${params.id} cat. Type of ID is ${typeof params.id}`;
  }
}
