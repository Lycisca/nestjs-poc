import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationNumber implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {

    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

export class ValidationPresence implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
