import { IsNumber, IsString } from 'class-validator';

export class CatCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
