import { BadRequestException, Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private users = [
    new UserResponseDto({
      id: 10,
      age: 42,
      firstName: 'Vitia',
      lastName: 'Marochkin',
    }),
  ];

  findById(id: number): UserResponseDto {
    const user = this.users.find(person => person.id === id);
    if (!user) {
      throw new BadRequestException(`User with ID ${id} was not found`);
    }

    return user;
  }
}
