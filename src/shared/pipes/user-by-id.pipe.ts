import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from 'src/endpoints/users/users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  transform(id: number, metadata: ArgumentMetadata): any {
    if (!id) {
      throw new BadRequestException('Incorrect ID');
    }

    return this.userService.findById(id);
  }
}
