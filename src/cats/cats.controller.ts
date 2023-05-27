import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CustomParseIntPipe } from 'src/shared/pipes/custom-parse-int.pipe';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CatCreateDto } from './dto/cat-create.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catSevice: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll(): any {
    //throw new ForbiddenException();
    return this.catSevice.findAll();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(CreateCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CatCreateDto): Promise<Cat> {
    const dto = { ...createCatDto, id: Math.floor(Math.random() * 1000000) };
    return this.catSevice.create(dto);
  }

  @Get(':id')
  findOne(
    @Param('id', new CustomParseIntPipe()) id: number,
    //@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
  ): Cat {
    const cat = this.catSevice.findOne(id);
    if (cat === undefined) throw new BadRequestException(`Cat "${id}" is not found`);
    return cat;
    //return `This action returns a #${id} cat. Type of ID is ${typeof id}`;
  }
}
