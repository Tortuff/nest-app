import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const data = parseInt(value, 10);
    if (isNaN(data)) {
      throw new BadRequestException('Validation failed');
    }

    return data;
  }
}
