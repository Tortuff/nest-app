import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserByIdPipe } from 'src/shared/pipes/user-by-id.pipe';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, UserByIdPipe) user: UserResponseDto): UserResponseDto {
    return user;
  }
}
