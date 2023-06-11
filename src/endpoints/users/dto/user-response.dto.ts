import { IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  constructor(data?: UserResponseDto) {
    data && Object.assign(this, data);
  }

  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;
}
