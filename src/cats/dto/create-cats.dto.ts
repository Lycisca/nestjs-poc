import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatsDto {
  @ApiModelProperty() readonly name: string;
  @ApiModelProperty() readonly age: number;
}
