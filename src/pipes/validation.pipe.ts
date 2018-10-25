import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationUser implements PipeTransform<string> {
  async transform(value: string | any, metadata: ArgumentMetadata) {
    // Id param must be number
    if (metadata.type == "param" && metadata.data == "id") {
      const val: number = parseInt(value);
      if (isNaN(val)) {
        throw new BadRequestException('Validation failed');
      }
      return val;
    }
    // Filter parameters
    else if(metadata.type == "body") {
      const body: object  = (({ firstName, lastName }) => ({ firstName, lastName }))(value);
      return body;
    }
    return value;
  }
}
