import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

type Constructor =
  | ObjectConstructor
  | ArrayConstructor
  | NumberConstructor
  | StringConstructor
  | BooleanConstructor;

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation faild');
    } else {
      return value;
    }
  }

  private toValidate(metatype: any): boolean {
    const types: Constructor[] = [Object, Array, Number, String, Boolean];
    return !types.includes(metatype);
  }
}
