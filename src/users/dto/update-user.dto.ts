import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiModelProperty() readonly firstName: string;
  @ApiModelProperty() readonly lastName: string;
}
