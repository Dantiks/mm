import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      throw new ValidationException(this.flatten(errors));
    }
    return value;
  }

  /**
   * У вложенных ошибок (@ValidateNested) сообщения лежат не в constraints,
   * а в children. Раньше пайп читал только constraints и падал на
   * Object.values(undefined) — валидация превращалась в 500 вместо 400.
   */
  private flatten(errors: ValidationError[], path = ''): string[] {
    const messages: string[] = [];

    for (const err of errors) {
      const field = path ? `${path}.${err.property}` : err.property;

      if (err.constraints) {
        messages.push(`${field} - ${Object.values(err.constraints).join(', ')}`);
      }

      if (err.children?.length) {
        messages.push(...this.flatten(err.children, field));
      }
    }

    return messages;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
