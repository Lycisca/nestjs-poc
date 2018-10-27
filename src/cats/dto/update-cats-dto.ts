import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCatsDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly age: number;
}
