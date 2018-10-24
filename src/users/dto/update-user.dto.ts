import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty() readonly id: number;
  @ApiModelProperty() readonly firstName: string;
  @ApiModelProperty() readonly lastName: string;
}
