import { IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;
}
