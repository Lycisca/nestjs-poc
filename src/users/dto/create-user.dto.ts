import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly firstName: string;
  @ApiModelProperty()
  readonly lastName: string;
}
