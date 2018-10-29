import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCatDto {
  @ApiModelProperty()
  readonly name?: string;
  @ApiModelProperty()
  readonly age?: number;
}
