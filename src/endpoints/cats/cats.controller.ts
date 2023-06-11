import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from 'src/endpoints/cats/cats.service';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { LoggingInterceptor } from 'src/shared/interseptors/logging.interceptor';
import { TransformInterceptor } from 'src/shared/interseptors/transform.interceptor';
import { CustomParseIntPipe } from 'src/shared/pipes/custom-parse-int.pipe';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CatCreateDto } from './dto/cat-create.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(TransformInterceptor<Cat>)
  findAll(): Cat[] {
    //throw new ForbiddenException();
    return this.catService.findAll();
  }

  @Post()
  @UseInterceptors(LoggingInterceptor)
  // @Roles('admin')
  // @UsePipes(new JoiValidationPipe(CreateCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CatCreateDto): Promise<Cat> {
    const dto = { ...createCatDto, id: Math.floor(Math.random() * 1000000) };
    return this.catService.create(dto);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  findOne(
    @Param('id', new CustomParseIntPipe()) id: number,
    //@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
  ): Cat {
    const cat = this.catService.findOne(id);
    if (cat === undefined) throw new BadRequestException(`Cat "${id}" is not found`);
    return cat;
    //return `This action returns a #${id} cat. Type of ID is ${typeof id}`;
  }
}
