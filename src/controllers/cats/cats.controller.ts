import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatCreateDto } from './dto/cat-create.dto';

@Controller('cats')
export class CatsController {
	@Get()
	findAll(): string {
		return 'Return all cats';
	}

	@Post()
	async create(@Body() createCatDto: CatCreateDto): Promise<string> {
		console.log('createCatDto :>> ', createCatDto);
		return 'This action adds a new cat: ' + createCatDto.name;
	}

	@Get(':id')
	findOne(@Param() params: { id: string }): string {
		return `This action returns a #${params.id} cat. Type of ID is ${typeof params.id}`;
	}
}
