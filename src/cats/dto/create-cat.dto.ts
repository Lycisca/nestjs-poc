import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly age: number;
}
